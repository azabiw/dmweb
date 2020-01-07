var express = require('express');
var router = express.Router();
const url = 'mongodb://localhost:27017/dmweb'; //connection string to mongodb


//todo: korjaa
/* GET users listing. */
router.get('/', function(req, res, next) {
  let MongoClient = require('mongodb').MongoClient;
  MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    let db = client.db('dmweb');
    let user = getHash("testi");
    db.collection('dmweb').find({"user": user}).toArray(function (err, result) {
      if (err) throw err;
      res.send(result);
    })
  })


});

//käsittelee post tapahtumat
//Todo: virheenkäsittely
router.post('/', function(req, res, next) {
  const data = req.body.data;
  const user = getHash(req.body.user);
  const type = req.body.formType;
  console.log("username : " + user);
  let result = insertToDB(data, user, type);
  console.log("insertion result: " + result);
  console.log("body was: " + data);
  res.send(201);
});

//palauttaa annetusta tekstistä MD5 tiivisteen.
//käytetään käyttäjäkohtaisen datan tallentamiseen.
function getHash(text) {
  let crypto = require('crypto');
  return crypto.createHash('md5').update(text).digest('hex');

}


//käsittelee patch metodin kutsun ja tietokannassa olevan hahmon muokkaamisen
router.patch("/", function (req,res,next) {
  //console.log(req);
  let MongoClient = require('mongodb').MongoClient;
  const data = req.body.data;
  const user = getHash(req.body.user);
  const charID = getHash(req.body.data.name);
  /*console.log(data);
  console.log(user);
  console.log(charID); */
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("dmweb");
    let query = { user: user,
    charid : charID};
    let newvalues = { $set: { data: data }};
    dbo.collection("dmweb").updateOne(query, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
  });
});

//poistaa tietokannasta hahmon
router.delete("/", function (req, res, next) {
  let MongoClient = require('mongodb').MongoClient;
  const data = req.body.data;
  const user = getHash(req.body.user);
  const charID = getHash(data.name);
  console.log(data);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("dmweb");
    let query = { user: user,
      charid : charID};
    dbo.collection("dmweb").findOneAndDelete(query,  function(err, res) {
      if (err) throw err;
      console.log("1 document removed");
      db.close();
    });
  });
});


//TODO: virheenkäsittely
//data = character to inserted to mongoDB
//palauttaa onnistuiko lisääminen
function insertToDB(data, username, type) {
  let MongoClient = require('mongodb').MongoClient;
  let charID = getHash(data.name);
  MongoClient.connect(url, function (err, client) {
    if (err) throw err;

    let db = client.db('dmweb');
    data  = { "data" : data,
              "user" : username,
              "charid": charID,
              "type": type};

    db.collection("dmweb").insertOne(data, function(err, res) {
      if (err) throw err;

      console.log("inserted");
    });
    client.close();
    return true;
  })


}
module.exports = router;
