// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create an express application
const app = express();

// Apply middleware
app.use(bodyParser.json());
app.use(cors());

// Store comments
const commentsByPostId = {};

// Get all comments for a post
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Add a comment to a post
app.post('/posts/:id/comments', (req, res) => {
  // Create a random ID for the comment
  const commentId = randomBytes(4).toString('hex');

  // Get the comment content from the request body
  const { content } = req.body;

  // Get the comments for the post
  const comments = commentsByPostId[req.params.id] || [];

  // Add the comment to the comments array
  comments.push({ id: commentId, content });

  // Store the comments
  commentsByPostId[req.params.id] = comments;

  // Send back the comments
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});