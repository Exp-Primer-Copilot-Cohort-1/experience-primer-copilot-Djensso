// create web server
// 1. load module
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

// 2. create app
var app = express();
var COMMENTS_FILE = __dirname + '/comments.json';

// 3. set port
app.set('port', process.env.PORT || 3000);

// 4. use middleware
app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// 5. create router
app.get('/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.post('/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    var newComment = {
      id: Date.now(),
      // assuming you have author and text in the request body
      author: req.body.author,
      text: req.body.text
    };

    comments.push(newComment);
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      res.json(comments);
    });
  });
});