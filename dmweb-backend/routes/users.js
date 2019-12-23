var express = require('express');
var router = express.Router();
const url = 'mongodb://localhost:27017/dmweb'; //connection string to mongodb

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  let result = getDataFromDB();
  res.send(result);
});

//käsittelee post tapahtumat
//Todo: virheenkäsittely
router.post('/', function(req, res, next) {
  const character = req.body;
  let result = insertToDB(character)
  console.log("insertion result: " + result);
  console.log("body was: " + character);
  res.send(201);
});

//TODO: muokkaa
function getDataFromDB() {
  let MongoClient = require('mongodb').MongoClient;
  MongoClient.connect(url, function (err, client) {
    if (err) throw err;

    let db = client.db('dmweb');

    db.collection('dmweb').find().toArray(function (err, result) {
      if (err) throw err;
      return result;
    })
  })
}

//TODO: implement ja virheenkäsittely
//muokkaa annettua  JSON -oliota tietokannassa
function modifyInDB(data) {

}

//TODO: implement
function removeFromDB (removable){

}

//TODO: virheenkäsittely
//data = character to inserted to mongoDB
//palauttaa onnistuiko lisääminen
function insertToDB(data) {
  let MongoClient = require('mongodb').MongoClient;

  MongoClient.connect('mongodb://localhost:27017/dmweb', function (err, client) {
    if (err) throw err;

    let db = client.db('dmweb');
     data  = { "character" : data};


    db.collection("dmweb").insertOne(data, function(err, res) {
      if (err) throw err;
      console.log("inserted");
    });
    client.close();
    return true;
  })


}
module.exports = router;
