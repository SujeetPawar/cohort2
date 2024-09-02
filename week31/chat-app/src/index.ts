import { WebSocketServer, WebSocket } from "ws";
import {createClient} from "redis"

const publishClient = createClient()
publishClient.connect();

const subscribeClient = createClient()
subscribeClient.connect();

const wss = new WebSocketServer({ port: 8080 });

const subscriptions: {
  [key: string]: {
    ws: WebSocket;
    rooms: string[];
  };
} = {};

// setInterval(()=>{
//     console.log(subscriptions)
// },10000)

wss.on("connection", function connection(userSocket) {
  const id = randomId();

  subscriptions[id] = {
    ws: userSocket,
    rooms: []
  };

  userSocket.on("message", function message(data) {
    const parsedMessage = JSON.parse(data as unknown as string);

    if (parsedMessage.type === "SUBSCRIBE") {   
      subscriptions[id].rooms.push(parsedMessage.room);
      if(oneUserSubscribedTo(parsedMessage.room)){
        subscribeClient.subscribe(parsedMessage.room , (message)=>{
            const parsedMessage = JSON.parse(message);
            Object.keys(subscriptions).forEach((userId) => {
                const { ws, rooms } = subscriptions[userId];
                if (rooms.includes(parsedMessage.roomId)) {
                  ws.send(parsedMessage.message);
                }
              });
        })
      }
    }

    if (parsedMessage.type === "UNSUBSCRIBE") {   
      subscriptions[id].rooms =subscriptions[id].rooms.filter(x => x !== parsedMessage.room);
    }

    if (parsedMessage.type === "sendMessage") {
      const message = parsedMessage.message;
      const roomId = parsedMessage.roomId;



    publishClient.publish(roomId, JSON.stringify({
        type:"sendMessage" , 
        room:roomId , 
        message
    }))

    }
  });
});

function randomId() {
  return Math.random();
}

function oneUserSubscribedTo(roomId : string){
    let totalInterestedPeople = 0
    Object.keys(subscriptions).map((userId)=>{
        if(subscriptions[userId].rooms.includes(roomId)){
            totalInterestedPeople++;
        }
    })
    if(totalInterestedPeople ==1) return true;
    return false
}

