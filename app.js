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
var firebase = require("firebase");
var admin = require("firebase-admin");
var firestore = require("firebase-admin/firestore");
var upload = multer({ dest: "uploads/" });
const bodyParser = require("body-parser");
const { time } = require("console");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.get("/file", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("server On");
});

const firebaseConfig = {
  apiKey: "AIzaSyBS3wuBvBVBNxFxKiNDxqfHCsmDFNu6N78",
  authDomain: "supportus-a2878.firebaseapp.com",
  databaseURL: "https://supportus-a2878-default-rtdb.firebaseio.com",
  projectId: "supportus-a2878",
  storageBucket: "supportus-a2878.appspot.com",
  messagingSenderId: "450738608417",
  appId: "1:450738608417:web:e6229ad9f31f0226bc4660",
  measurementId: "G-330B1298HE",
};
firebase.initializeApp(firebaseConfig);
let database = firebase.database();

app.get("/push", function (req, res) {
  let query = req.query.name;

  database
    .ref("user")
    .push({ name: name, time: time, text: text }, function (error) {
      if (error) console.error(error);
      else console.log("success save !!");
    });
  return res.json({ firebase: true });
});

app.get("/send", upload.single("fileInput"), (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  const date = new Date();
  let time = date.toLocaleTimeString("ko-kr");
  let name = "유승훈";
  let text = "a";

  let speechData = {
    method: "POST",
    body: fs.createReadStream("./sttTest1.mp3"),
    headers: {
      "Content-Type": "application/octet-stream",
      "X-NCP-APIGW-API-KEY-ID": "bi3sbu34oo",
      "X-NCP-APIGW-API-KEY": "3ilzXddSzUs555vWaxIBtg8RCP5n3E9RRvWkYJQ0",
    },
  };

  function stt(response) {
    text = response;

    return text;
  }
  fetch(
    `https://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=Eng`,
    speechData
  )
    .then((response) => response.json())
    .then((response) => {
      return res.send(stt(response));
    });

  return res.json({ firebase: true });
});
