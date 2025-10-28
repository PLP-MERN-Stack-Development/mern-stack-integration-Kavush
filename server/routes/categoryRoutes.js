import express from 'express';
import { getCategories, createCategory } from '../controllers/categoryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateCreateCategory } from '../middleware/validation.js';

const router = express.Router();

router.route('/')
  .get(getCategories)
  .post(protect, validateCreateCategory, createCategory);

export default router;