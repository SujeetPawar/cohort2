import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [latestMessages, setLatestMessages] = useState("");
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      console.log("connected");
      setSocket(socket);
    };
    socket.onmessage = (message) => {
      console.log("Received Message", message.data);
      setLatestMessages(message.data);
    };
    
  }, []);

  if (!socket) {
    return <div>loading...</div>;
  }
  return (
    <>
      <div>{latestMessages}</div>

      <button
        onClick={() => {
          socket.send("hello world");
        }}
      >
        Send
      </button>
    </>
  );
}

export default App;
