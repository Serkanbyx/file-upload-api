const multer = require("multer");
const path = require("path");
const config = require("../config/index");
const { cloudinaryStorage } = require("../config/cloudinary");
const {
  generateUniqueFilename,
  getMaxFileSize,
  ensureUploadsDir,
  uploadsDir,
} = require("../utils/fileHelpers");
const ApiError = require("../utils/ApiError");

/* ── Local disk storage ── */
const localStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    ensureUploadsDir();
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    cb(null, generateUniqueFilename(file.originalname));
  },
});

/* ── Shared file filter (type validation) ── */
const fileFilter = (_req, file, cb) => {
  if (config.allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new ApiError(
        400,
        `File type "${file.mimetype}" is not allowed. Accepted: ${config.allowedMimeTypes.join(", ")}`
      ),
      false
    );
  }
};

/* ── Build multer instance based on storage mode ── */
const createUpload = () => {
  const storage =
    config.storageMode === "cloudinary" ? cloudinaryStorage : localStorage;

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: getMaxFileSize() },
  });
};

const upload = createUpload();

module.exports = upload;
