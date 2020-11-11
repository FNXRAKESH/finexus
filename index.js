var express = require("express");
var router = express.Router();
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
const mongoose = require("mongoose");
var db;
const port = 9000;
app.listen(port)
app.use(bodyParser.json());
app.use(cors());
mongoose.connect(
  "mongodb+srv://rakesh:rocman911@finexus.ujjck.mongodb.net/Finexus?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, database) {
      if (err) return console.log("error ", err);
       
    db = database;
    console.log("App is listening on port " + port);
  }
);
app.get("/", (req, res) => {
    console.log("start");
  res.send("Hello");
});

app.post("/api/register", (req, res) => {
  console.log("inside ", req.body);
  var conn = mongoose.connection;
  var ObjectID = require("mongodb").ObjectID;

  var user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    workEmail: req.body.workEmail,
    phone: req.body.phone,
    company: req.body.company,
    _id: new ObjectID(),
  };
  conn
    .collection("decemberWebinar")
    .find({ workEmail: req.body.workEmail })
    .toArray(function (err, result) {
      console.log(result);
      if (result.length > 0) return res.json({ data: "already registered" });
      else {
        conn.collection("decemberWebinar").insertOne(user);
        res.json({ data: "record added" });
      }
    });
});

module.exports = router;