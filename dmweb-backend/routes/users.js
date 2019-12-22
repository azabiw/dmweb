var express = require('express');
var router = express.Router();

const url = 'mongodb://localhost:27017/dmweb'; //connection string to mongodb

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  let result = getDataFromDB();
  res.send(result);
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
//tallentaa annetun JSON -olion tietokantaan
function saveToDB(data) {

}

//TODO: implement
function removeFromDB (removable){

}

//TODO: virheenkäsittely
//data = character to inserted to mongoDB
function insertToDB(data) {
  let MongoClient = require('mongodb').MongoClient;

  MongoClient.connect('mongodb://localhost:27017/dmweb', function (err, client) {
    if (err) throw err;

    let db = client.db('dmweb');
     data  = { "Name" : "Character name", "id" : "1000" }


    db.collection("dmweb").insertOne(data, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
    });
    client.close();
  })


}
module.exports = router;
