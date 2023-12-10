// create web server using express
const express = require('express');
const app = express();
// import the comments.json file
const comments = require('./comments.json');
const cors = require('cors');
// use cors
app.use(cors());

// create a GET route at /comments
app.get('/comments', (req, res) => {
  // send back the comments json file
  res.send(comments);
});

// set up the port
const port = process.env.PORT || 4001;
// listen on the port
app.listen(port, () => {
  console.log(`Web server is listening on port ${port}!`);
});

// import the file system module
const fs = require('fs');

// read the comments.json file
fs.readFile('./comments.json', 'utf8', (err, data) => {
  if (err) {
    console.log(`Error reading file from disk: ${err}`);
  } else {
    // parse JSON string to JSON object
    const comments = JSON.parse(data);

    // create a GET route at /comments
    app.get('/comments', (req, res) => {
      // send back the comments json file
      res.send(comments);
    });
  }
});