require("dotenv").config();

const port = parseInt(process.env.PORT, 10) || 3000;

const config = {
  port,
  nodeEnv: process.env.NODE_ENV || "development",
  storageMode: process.env.STORAGE_MODE || "local",
  maxFileSizeMb: parseInt(process.env.MAX_FILE_SIZE_MB, 10) || 5,
  baseUrl: process.env.BASE_URL || `http://localhost:${port}`,
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  allowedMimeTypes: [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "application/pdf",
    "text/plain",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
};

module.exports = config;
