var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  var t={
  "heroesUrl": "api/heroes",
  "textfile": "okkkkkkk"
};
  res.send(t);
});

module.exports = router;
