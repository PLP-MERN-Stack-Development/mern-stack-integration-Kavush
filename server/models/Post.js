<<<<<<< HEAD
import mongoose from 'mongoose';
=======
// Post.js - Mongoose model for blog posts

const mongoose = require('mongoose');
>>>>>>> 8b97f325fbc8aa566ea30610ee5e62326d2b7dce

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
    },
    featuredImage: {
      type: String,
      default: 'default-post.jpg',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    excerpt: {
      type: String,
      maxlength: [200, 'Excerpt cannot be more than 200 characters'],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    tags: [String],
    isPublished: {
      type: Boolean,
      default: false,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        content: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
<<<<<<< HEAD
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
=======
  { timestamps: true }
>>>>>>> 8b97f325fbc8aa566ea30610ee5e62326d2b7dce
);

// Create slug from title before saving
PostSchema.pre('save', function (next) {
  if (!this.isModified('title')) {
    return next();
  }
  
  this.slug = this.title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
    
  next();
});

// Virtual for post URL
PostSchema.virtual('url').get(function () {
  return `/posts/${this.slug}`;
});

// Method to add a comment
<<<<<<< HEAD
PostSchema.methods.addComment = async function (userId, content) {
  this.comments.push({ 
    user: userId, 
    content,
    createdAt: new Date()
  });
=======
PostSchema.methods.addComment = function (userId, content) {
  this.comments.push({ user: userId, content });
>>>>>>> 8b97f325fbc8aa566ea30610ee5e62326d2b7dce
  return this.save();
};

// Method to increment view count
<<<<<<< HEAD
PostSchema.methods.incrementViewCount = async function () {
=======
PostSchema.methods.incrementViewCount = function () {
>>>>>>> 8b97f325fbc8aa566ea30610ee5e62326d2b7dce
  this.viewCount += 1;
  return this.save();
};

<<<<<<< HEAD
export default mongoose.model('Post', PostSchema);
=======
module.exports = mongoose.model('Post', PostSchema); 
>>>>>>> 8b97f325fbc8aa566ea30610ee5e62326d2b7dce
