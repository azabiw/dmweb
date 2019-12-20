var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  connectToDB();
  res.json([{
    id: 1,
    username: "Character 1"
  }, {
    id: 2,
    username: "Character 2"
  }]);
});
function connectToDB() {
  let MongoClient = require('mongodb').MongoClient;

  MongoClient.connect('mongodb://localhost:27017/dmweb', function (err, client) {
    if (err) throw err;

    let db = client.db('dmweb');

    db.collection('dmweb').find().toArray(function (err, result) {
      if (err) throw err;

      console.log(result);
    })
  })
}
module.exports = router;
