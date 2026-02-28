const fs = require("fs");
const path = require("path");
const config = require("../config/index");
const { cloudinary } = require("../config/cloudinary");
const ApiError = require("../utils/ApiError");
const {
  deleteLocalFile,
  getLocalFileUrl,
  uploadsDir,
} = require("../utils/fileHelpers");

/**
 * POST /api/upload — Upload a single file
 */
const uploadFile = (req, res, next) => {
  try {
    if (!req.file) {
      throw new ApiError(400, "No file provided. Please attach a file with key \"file\".");
    }

    const isCloud = config.storageMode === "cloudinary";

    const fileData = {
      originalName: req.file.originalname,
      filename: isCloud ? req.file.filename : req.file.filename,
      mimeType: req.file.mimetype,
      size: req.file.size,
      url: isCloud ? req.file.path : getLocalFileUrl(req, req.file.filename),
      storage: isCloud ? "cloudinary" : "local",
    };

    res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      data: fileData,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/upload/multiple — Upload multiple files (max 5)
 */
const uploadMultipleFiles = (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      throw new ApiError(400, "No files provided. Please attach files with key \"files\".");
    }

    const isCloud = config.storageMode === "cloudinary";

    const filesData = req.files.map((file) => ({
      originalName: file.originalname,
      filename: file.filename,
      mimeType: file.mimetype,
      size: file.size,
      url: isCloud ? file.path : getLocalFileUrl(req, file.filename),
      storage: isCloud ? "cloudinary" : "local",
    }));

    res.status(201).json({
      success: true,
      message: `${req.files.length} file(s) uploaded successfully`,
      data: filesData,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/files — List all locally stored files
 */
const listFiles = (req, res, next) => {
  try {
    if (config.storageMode === "cloudinary") {
      throw new ApiError(
        400,
        "File listing is only available in local storage mode."
      );
    }

    if (!fs.existsSync(uploadsDir)) {
      return res.json({ success: true, data: [] });
    }

    const files = fs.readdirSync(uploadsDir).map((filename) => ({
      filename,
      url: getLocalFileUrl(req, filename),
      size: fs.statSync(path.join(uploadsDir, filename)).size,
    }));

    res.json({ success: true, count: files.length, data: files });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/files/:filename — Delete a file by filename
 */
const deleteFile = async (req, res, next) => {
  try {
    const { filename } = req.params;

    if (config.storageMode === "cloudinary") {
      const publicId = `file-upload-api/${path.parse(filename).name}`;
      const result = await cloudinary.uploader.destroy(publicId);

      if (result.result !== "ok") {
        throw new ApiError(404, "File not found on Cloudinary.");
      }

      return res.json({
        success: true,
        message: "File deleted from Cloudinary",
      });
    }

    const deleted = deleteLocalFile(filename);
    if (!deleted) {
      throw new ApiError(404, "File not found.");
    }

    res.json({ success: true, message: "File deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadFile,
  uploadMultipleFiles,
  listFiles,
  deleteFile,
};
