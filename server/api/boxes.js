var express = require('express');
var router = express.Router();
var db = require('../services/database.js');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', function(req, res) {
  var users = db.query('SELECT name, address FROM boxes;', function (err, result) {
  	if (err) throw err;

  	console.log(result.rows);
  	res.json(result.rows);
  });
});

module.exports = router;