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
  params: {
    folder: "file-upload-api",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp", "pdf"],
    transformation: [{ quality: "auto" }],
  },
});

module.exports = { cloudinary, cloudinaryStorage };
