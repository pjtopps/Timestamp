// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('*', (req, res) => {
  var time = req.originalUrl.slice(1);
  var date;
  console.log(time, parseInt(time));
  
  if (parseInt(time)) {
    console.log('in here');
    date = new Date(parseInt(time));
  }
  else {
    date = new Date(time);
  }
  
  console.log(date);
  var months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  
  var ans = {
    'unix': date.getTime(),
    'natural': months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
  }
  
  res.send(JSON.stringify(ans));
});


/*
app.get("/dreams", function (request, response) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];
*/

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  //console.log('Your app is listening on port ' + listener.address().port);
});
