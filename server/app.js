var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fetch = require('node-fetch');
var port = process.env.PORT || 80;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/auto/:ticker', function(req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  fetch('https://api.tiingo.com/tiingo/utilities/search?query=' + req.params.ticker + '&token=196e5f07943589b362493421eeb94fff8af1e993')
  	.then(res => res.json())
  	.then(json => {
  		res.send(json);
  	});
});

app.get('/price/:ticker', function(req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  fetch('https://api.tiingo.com/iex/?tickers=' + req.params.ticker + '&token=196e5f07943589b362493421eeb94fff8af1e993')
    .then(res => res.json())
    .then(json => {
      res.send(json);
    });
});

app.get('/details/:ticker', function(req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  fetch('https://api.tiingo.com/tiingo/daily/' + req.params.ticker + '?token=196e5f07943589b362493421eeb94fff8af1e993')
    .then(res => res.json())
    .then(json => {
      res.send(json);
    });
});

app.get('/news/:ticker', function(req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  fetch('https://newsapi.org/v2/everything?apiKey=762ed7ca638c4da5abde56e6b81c15d9&q=' + req.params.ticker)
    .then(res => res.json())
    .then(json => {
      res.send(json);
    });
});

app.get('/watch/:tickers', function(req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  fetch('https://api.tiingo.com/iex/?tickers=' + req.params.tickers + '&token=196e5f07943589b362493421eeb94fff8af1e993')
    .then(res => res.json())
    .then(json => {
      res.send(json);
    });
});

app.get('/portfo/:tickers', function(req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  fetch('https://api.tiingo.com/iex/?tickers=' + req.params.tickers + '&token=196e5f07943589b362493421eeb94fff8af1e993')
    .then(res => res.json())
    .then(json => {
      res.send(json);
    });
});

app.get('/daily/:ticker/:date', function(req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  fetch('https://api.tiingo.com/iex/' + req.params.ticker + '/prices?startDate=' + req.params.date + '&resampleFreq=4min&token=196e5f07943589b362493421eeb94fff8af1e993')
    .then(res => res.json())
    .then(json => {
      res.send(json);
    });
});

app.get('/hist/:ticker/:date', function(req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  fetch('https://api.tiingo.com/tiingo/daily/' + req.params.ticker + '/prices?startDate=' + req.params.date + '&resampleFreq=daily&token=196e5f07943589b362493421eeb94fff8af1e993')
    .then(res => res.json())
    .then(json => {
      res.send(json);
    });
});

async function getDescription(ticker) {
    let response = await fetch('https://api.tiingo.com/tiingo/daily/' + ticker + '?token=196e5f07943589b362493421eeb94fff8af1e993');
    let data = await response.json();
    return data;
}

async function getNews(ticker) {
    let response = await fetch('https://newsapi.org/v2/everything?apiKey=762ed7ca638c4da5abde56e6b81c15d9&q=' + ticker);
    let data = await response.json();
    return data;
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port);
