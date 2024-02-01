const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
const signLog = require("./modules/signlog");
const test = require("./modules/test");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.unsubscribe(express.static(`${__dirname}/public`));

app.use(cors());
app.use(bodyParser.json());

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, GET, POST, DELETE, PATCH, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "origin",
    "X-Api-Key",
    "x-requested-with",
    "Content-type",
    "Accept",
    "Authorization"
  );
  next();
});

// CRUD
app.post("/api/signin", function (req, res) {
  signLog.signin(req, res);
});

app.post("/api/login", function (req, res) {
  signLog.login(req, res);
});

app.post("/api/sendLink", function (req, res) {
  signLog.sendLink(req, res);
});

app.patch("/api/changePassword", function (req, res) {
  signLog.changePassword(req, res);
});

app.post("/api/test", function (req, res) {
  test.completeTest(req, res);
});

app.get("/api/answers", function (req, res) {
  test.autoDiagnostic(req, res);
});

// CRUD
db.connect();
const port = 3001;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
