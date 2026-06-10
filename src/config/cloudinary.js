const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const config = require("./index");

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: (_req, file) => {
    const isImage = file.mimetype.startsWith("image/");
    return {
      folder: "file-upload-api",
      resource_type: isImage ? "image" : "raw",
      allowed_formats: [
        "jpg",
        "jpeg",
        "png",
        "gif",
        "webp",
        "pdf",
        "txt",
        "doc",
        "docx",
      ],
      ...(isImage ? { transformation: [{ quality: "auto" }] } : {}),
    };
  },
});

module.exports = { cloudinary, cloudinaryStorage };
