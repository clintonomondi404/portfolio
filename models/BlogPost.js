const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Emerging Technologies and Trends in Website Development in 2024'],
    minlength: [5, 'Title must be at least 5 characters long'],
    trim: true // Removes leading and trailing whitespace
  },
  author: {
    type: String,
    required: [true, 'Clinton'],
    trim: true,
    index: true // Indexing for performance on author-based queries
  },
  body: {
    type: String,
    required: [true, 'Creating a three-tier architecture on AWS involves setting up three layers: a Web layer, an Application layer, and a Database layer.'],
    minlength: [10, 'Body must be at least 10 characters long']
  },
  comments: [{
    body: {
      type: String,
      required: [true, 'Comment body is required'],
      trim: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  date: {
    type: Date,
    default: Date.now
  },
  hidden: {
    type: Boolean,
    default: false
  },
  meta: {
    votes: {
      type: Number,
      default: 0
    },
    favs: {
      type: Number,
      default: 0
    }
  }
}, { timestamps: true }); // Mongoose handles createdAt and updatedAt fields

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
