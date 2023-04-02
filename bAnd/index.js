const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(bodyparser.json());

//Db connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "simpleDb",
  port: 3306,
});

//check db connection
db.connect((err) => {
  if (err) {
    console.log(err, "DBdERR");
    F;
  }
  console.log("Db Connected");
});

app.listen(3000, () => {
  console.log("server-running");
});

//get all data

app.get("/user", (req, res) => {
  //   console.log('get')
  let qr = `SELECT * FROM user`;
  db.query(qr, (err, result) => {
    if (err) {
      console.log(err, "Errs");
    }
    if (result.length > 0) {
      res.send({
        message: "All user data",
        data: result,
      });
    }
  });
});

//single data
app.get("/user/:id", (req, res) => {
  let gId = req.params.id;
  let qr = `SELECT * FROM user WHERE id = ${gId}`;
  db.query(qr, (err, result) => {
    if (err) {
      console.log(err, "Errs");
    }
    if (result.length > 0) {
      res.send({
        message: "get single data",
        data: result,
      });
    } else {
      res.send({
        message: "data not found",
      });
    }
  });
});

//Create Data

app.post("/user", (req, res) => {
  console.log(req.body, "CreatedData");

  let fullName = req.body.fullname;
  let eMail = req.body.email;
  let mB = req.body.mobile;

  let qr = `INSERT INTO user(fullname,email,mobile) values ('${fullName}','${eMail}','${mB}')`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err, "Errs");
    }

    res.send({
      message: "Data inserted",
      data: result,
    });
  });
});

//Update a data

app.put("/user/:id", (req, res) => {
  let gId = req.params.id;
  let fullName = req.body.fullname;
  let eMail = req.body.email;
  let mB = req.body.mobile;

  let qr = `UPDATE user SET fullname = '${fullName}', email = '${eMail}', mobile = '${mB}'
  WHERE id = ${gId}`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err, "Errs");
    }

    res.send({
      message: "Data updated",
      data: result,
    });
  });
});

//delete single data
app.delete("/user/:id", (req, res) => {
  let gId = req.params.id;

  let qr = `DELETE FROM user WHERE id = ${gId}`;
  db.query(qr, (err, result) => {
    if (err) {
      console.log(err, "Errs");
    }
    res.send({
      message: "Message Deleted",
    });
  });
});
