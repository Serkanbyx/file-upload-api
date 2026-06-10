const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const config = require("../config");

const uploadsDir = path.join(__dirname, "../../uploads");

/**
 * Generates a unique filename preserving the original extension.
 */
const generateUniqueFilename = (originalName) => {
  const ext = path.extname(originalName);
  return `${uuidv4()}${ext}`;
};

/**
 * Returns the byte limit derived from MB config.
 */
const getMaxFileSize = () => config.maxFileSizeMb * 1024 * 1024;

/**
 * Ensures the uploads directory exists.
 */
const ensureUploadsDir = () => {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
};

/**
 * Strips any directory components from a filename to prevent path traversal.
 */
const sanitizeFilename = (filename) => path.basename(filename);

/**
 * Deletes a file from the local uploads directory.
 */
const deleteLocalFile = (filename) => {
  const safeName = sanitizeFilename(filename);
  const filePath = path.join(uploadsDir, safeName);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return true;
  }
  return false;
};

/**
 * Builds a public URL for a locally stored file.
 */
const getLocalFileUrl = (req, filename) => {
  return `${req.protocol}://${req.get("host")}/uploads/${filename}`;
};

module.exports = {
  generateUniqueFilename,
  getMaxFileSize,
  ensureUploadsDir,
  deleteLocalFile,
  getLocalFileUrl,
  sanitizeFilename,
  uploadsDir,
};
