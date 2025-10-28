import express from 'express';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';
import {
  validateCreatePost,
  validateUpdatePost,
  validatePostId,
  validateAddComment,
  validateQueryParams
} from '../middleware/validation.js';

const router = express.Router();

router.route('/')
  .get(validateQueryParams, getPosts)
  .post(protect, validateCreatePost, createPost);

router.route('/:id')
  .get(validatePostId, getPost)
  .put(protect, validateUpdatePost, updatePost)
  .delete(protect, validatePostId, deletePost);

router.route('/:id/comments')
  .post(protect, validateAddComment, addComment);

// Search route (add this new route)
router.get('/search', validateQueryParams, getPosts);

export default router;