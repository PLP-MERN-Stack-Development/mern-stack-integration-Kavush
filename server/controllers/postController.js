import Post from '../models/Post.js';
import Category from '../models/Category.js';
import mongoose from 'mongoose';

// Get all published posts
export const getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    
    let query = { isPublished: true };
    
    // Filter by category if provided
    if (category) {
      const categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) {
        query.category = categoryDoc._id;
      }
    }
    
    // Search in title and content if provided
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    
    const posts = await Post.find(query)
      .populate('author', 'username avatar')
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Post.countDocuments(query);
    
    res.json({
      success: true,
      data: posts,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message
    });
  }
};

// Get single post by ID or slug
export const getPost = async (req, res) => {
  try {
    let post;
    
    // Check if param is ObjectId or slug
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      post = await Post.findById(req.params.id)
        .populate('author', 'username avatar')
        .populate('category', 'name slug')
        .populate('comments.user', 'username avatar');
    } else {
      post = await Post.findOne({ slug: req.params.id })
        .populate('author', 'username avatar')
        .populate('category', 'name slug')
        .populate('comments.user', 'username avatar');
    }
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    // Increment view count
    await post.incrementViewCount();
    
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message
    });
  }
};

// Create new post
export const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    await post.populate('author', 'username avatar');
    await post.populate('category', 'name slug');
    
    res.status(201).json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update post
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('author', 'username avatar')
      .populate('category', 'name slug');
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message
    });
  }
};

// Add comment to post
export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    await post.addComment(req.user?.id || '64abc123def456789012345', content);
    await post.populate('comments.user', 'username avatar');
    
    res.status(201).json({
      success: true,
      data: post.comments[post.comments.length - 1]
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};