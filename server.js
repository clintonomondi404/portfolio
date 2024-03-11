// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes
app.use(helmet()); // Set security-related HTTP response headers
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Database connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error(err));

// Import models
const BlogPost = require('./models/BlogPost');

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Index.html'));
});

app.post('/blog-posts', async (req, res) => {
  try {
    const newPost = new BlogPost({
      title: req.body.title,
      author: req.body.author,
      body: req.body.body,
      // You can add other fields similarly
    });
    
    await newPost.save();
    res.status(201).send(newPost);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
