var express = require('express');
var app = express();

var decode = require('urldecode');

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('*', (req, res) => {
  var time = req.originalUrl.slice(1);
  var date,
      flag;
  
  if (parseInt(time)) {
    date = new Date(parseInt(time));
  }
  else {
    time = decode(time);
    if (isNaN(Date.parse(time))) flag = true;
    date = new Date(time);
  }
  
  var months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  
  var ans = {
    unix: date.getTime(),
  }
  
  if (flag) {
    ans.natural = null;
  }
  else ans.natural = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
    
  res.send(ans);
});

// listen for requests :)
var listener = app.listen(process.env.PORT);
