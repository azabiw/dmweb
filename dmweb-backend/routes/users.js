var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  let result = connectToDB();

  let MongoClient = require('mongodb').MongoClient;
  MongoClient.connect('mongodb://localhost:27017/dmweb', function (err, client) {
    if (err) throw err;

    let db = client.db('dmweb');

    db.collection('dmweb').find().toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
    })
  });


  //res.send(connectToDB());
});
function connectToDB() {
  let MongoClient = require('mongodb').MongoClient;
  MongoClient.connect('mongodb://localhost:27017/dmweb', function (err, client) {
    if (err) throw err;

    let db = client.db('dmweb');

    db.collection('dmweb').find().toArray(function (err, result) {
      if (err) throw err;
      return result;
    })
  })
}

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
