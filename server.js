const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
var http = require("http").createServer(app);
//const data = new FormData();
const multer = require("multer");
const fetch = require("node-fetch");
const fs = require("fs");
const request = require("request");
var upload = multer({ dest: "uploads/" });
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.get("/file", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});

app.get("/send", upload.single("fileInput"), (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  let speechData = {
    method: "POST",
    body: fs.createReadStream("./sttTest1.mp3"),
    headers: {
      "Content-Type": "application/octet-stream",
      "X-NCP-APIGW-API-KEY-ID": "bi3sbu34oo",
      "X-NCP-APIGW-API-KEY": "3ilzXddSzUs555vWaxIBtg8RCP5n3E9RRvWkYJQ0",
    },
  };

  fetch(
    `https://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=Kor`,
    speechData
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
});
