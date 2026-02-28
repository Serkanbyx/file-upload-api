const multer = require("multer");
const ApiError = require("../utils/ApiError");

/**
 * Global error-handling middleware.
 * Catches Multer-specific errors, ApiErrors, and unexpected errors.
 */
const errorHandler = (err, _req, res, _next) => {
  /* Multer errors (file too large, too many files, etc.) */
  if (err instanceof multer.MulterError) {
    const messages = {
      LIMIT_FILE_SIZE: "File is too large. Check the allowed size limit.",
      LIMIT_FILE_COUNT: "Too many files uploaded.",
      LIMIT_UNEXPECTED_FILE: 'Unexpected field name. Use "file" as the key.',
    };

    return res.status(400).json({
      success: false,
      error: messages[err.code] || err.message,
    });
  }

  /* Known API errors */
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
  }

  /* Unknown / unexpected errors */
  console.error("Unhandled error:", err);
  return res.status(500).json({
    success: false,
    error: "Internal server error",
  });
};

module.exports = errorHandler;
