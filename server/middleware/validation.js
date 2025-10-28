import { body, param, query, validationResult } from 'express-validator';

// Validation result handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      field: error.param,
      message: error.msg,
      value: error.value
    }));
    
    return res.status(400).json({
      success: false,
      message: `Validation failed: ${errorMessages[0].message}`,
      details: errorMessages
    });
  }
  
  next();
};

// Simplified validation for development
export const validateRegister = [
  body('username')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .trim(),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  handleValidationErrors
];

export const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

export const validateCreatePost = [
  body('title')
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters')
    .trim(),
  body('content')
    .isLength({ min: 10 })
    .withMessage('Content must be at least 10 characters')
    .trim(),
  body('category')
    .notEmpty()
    .withMessage('Category is required'),
  handleValidationErrors
];

export const validateUpdatePost = [
  param('id')
    .notEmpty()
    .withMessage('Post ID is required'),
  body('title')
    .optional()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters')
    .trim(),
  body('content')
    .optional()
    .isLength({ min: 10 })
    .withMessage('Content must be at least 10 characters')
    .trim(),
  handleValidationErrors
];

export const validatePostId = [
  param('id')
    .notEmpty()
    .withMessage('Post ID is required'),
  handleValidationErrors
];

export const validateAddComment = [
  param('id')
    .notEmpty()
    .withMessage('Post ID is required'),
  body('content')
    .isLength({ min: 1, max: 1000 })
    .withMessage('Comment must be between 1 and 1000 characters')
    .trim(),
  handleValidationErrors
];

export const validateCreateCategory = [
  body('name')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .trim(),
  handleValidationErrors
];

export const validateQueryParams = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('search')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Search query too long')
    .trim(),
  handleValidationErrors
];