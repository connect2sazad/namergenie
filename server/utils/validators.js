const { body, validationResult } = require('express-validator');

// Validator: For name generation requests
const validateGenerateName = [
  body('idea')
    .trim()
    .notEmpty().withMessage('Idea is required.')
    .isLength({ min: 3 }).withMessage('Idea must be at least 3 characters long.'),
  
  // Error handler
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(err => err.msg),
      });
    }
    next();
  }
];

// Validator: For email subscription requests
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

module.exports = {
  validateGenerateName,
  isValidEmail
};
