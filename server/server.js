<<<<<<< HEAD
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables FIRST
dotenv.config();

console.log('🔧 Environment check:');
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Set' : '❌ Missing');

const app = express();
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Atlas Connected Successfully!'))
  .catch(err => {
    console.log('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Import models
import Post from './models/Post.js';
import Category from './models/Category.js';

// POSTS ROUTES
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username')
      .populate('category', 'name')
      .sort({ createdAt: -1 });
    
    res.json({ 
      success: true, 
      data: posts,
      count: posts.length,
      message: `Found ${posts.length} posts`
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username')
      .populate('category', 'name');
    
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    
    res.json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    const post = await Post.create(req.body);
    await post.populate('author', 'username');
    await post.populate('category', 'name');
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.put('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'username');
    
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    
    res.json({ success: true, data: post });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    
    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/posts/:id/comments', async (req, res) => {
  try {
    res.json({ success: true, message: 'Comment added to post ' + req.params.id });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// CATEGORIES ROUTES
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({ 
      success: true, 
      data: categories,
      count: categories.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// HEALTH CHECK
app.get('/api/health', (req, res) => {
  res.json({ 
    message: '✅ MERN Blog API Server is working perfectly!', 
    status: 'OK',
    timestamp: new Date().toISOString(),
    database: 'MongoDB Atlas',
    port: process.env.PORT
  });
});

// ROOT ROUTE
app.get('/', (req, res) => {
  res.json({
    message: '🏠 MERN Blog API Server',
    version: '1.0.0',
    database: 'MongoDB Atlas',
    endpoints: [
      'GET  /api/health - Server status',
      'GET  /api/posts - Get all posts',
      'GET  /api/posts/:id - Get single post',
      'POST /api/posts - Create new post',
      'PUT  /api/posts/:id - Update post',
      'DELETE /api/posts/:id - Delete post',
      'POST /api/posts/:id/comments - Add comment',
      'GET  /api/categories - Get all categories',
      'POST /api/categories - Create category'
    ]
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🎉 MERN Blog Server running on port ${PORT}`);
  console.log(`📍 API Root: http://localhost:${PORT}/`);
  console.log(`📍 Health: http://localhost:${PORT}/api/health`);
  console.log(`📍 Posts: http://localhost:${PORT}/api/posts`);
  console.log(`📍 Categories: http://localhost:${PORT}/api/categories`);
  console.log(`💾 Database: MongoDB Atlas (Cloud)`);
});
=======
// server.js - Main server file for the MERN blog application

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Import routes
const postRoutes = require('./routes/posts');
const categoryRoutes = require('./routes/categories');
const authRoutes = require('./routes/auth');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Log requests in development mode
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

// API routes
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('MERN Blog API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error',
  });
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Close server & exit process
  process.exit(1);
});

module.exports = app; 
>>>>>>> 8b97f325fbc8aa566ea30610ee5e62326d2b7dce
