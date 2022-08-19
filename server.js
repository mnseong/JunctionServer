const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
var http = require("http").createServer(app);

app.get("/", (req, res) => {
  res.send("ok");
});

app.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});

const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", function connection(ws, request) {
  console.log("connection");
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
  });
  ws.on("close", function close(code, reason) {
    console.log("close " + code + ":" + reason);
  });
  ws.send("something");
});
