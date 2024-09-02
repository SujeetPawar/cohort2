import express from "express";
import { Histogram } from "prom-client";
import client from "prom-client";

const app = express();

const histogram = new Histogram({
  name: "http_number_of_request",
  help: "Number of HTTP request made",
  buckets: [0.1, 1, 5, 10, 100],
});
//@ts-ignore
function middleware(req, res, next) {
  const startTime = Date.now();
  res.on("finish", () => {
    const endTime = Date.now();
    histogram.observe({}, endTime - startTime);
  });
  next();
}

app.use(middleware);

app.get("/user", (req, res) => {
  res.send({
    name: "John Doe",
    age: 25,
  });
});

app.post("/user", (req, res) => {
  const user = req.body;
  res.send({
    ...user,
    id: 1,
  });
});

app.get("/metrics", async (req, res) => {
  //   res.send(`http_number_of_request ${counter.}`)
  const metrics = await client.register.metrics();
  res.set("Content-Type", client.register.contentType);
  res.end(metrics);
});

app.listen(3000);
