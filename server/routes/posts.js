import express from 'express';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment
} from '../controllers/postController.js';

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(createPost);

router.route('/:id')
  .get(getPost)
  .put(updatePost)
  .delete(deletePost);

router.route('/:id/comments')
  .post(addComment);

export default router;