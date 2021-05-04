var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:tickers', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  console.log(req.tickers);
  res.send({"a":req.tickers});
});

module.exports = router;
