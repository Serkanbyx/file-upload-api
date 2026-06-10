const { Router } = require("express");
const upload = require("../middlewares/upload");
const {
  uploadFile,
  uploadMultipleFiles,
  listFiles,
  deleteFile,
} = require("../controllers/uploadController");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: File upload and management endpoints
 */

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload a single file
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: "Allowed types: JPEG, PNG, GIF, WebP, PDF, TXT, DOC, DOCX"
 *     responses:
 *       201:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: File uploaded successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     originalName:
 *                       type: string
 *                       example: photo.jpg
 *                     filename:
 *                       type: string
 *                       example: a1b2c3d4-e5f6-7890-abcd-ef1234567890.jpg
 *                     mimeType:
 *                       type: string
 *                       example: image/jpeg
 *                     size:
 *                       type: number
 *                       example: 102400
 *                     url:
 *                       type: string
 *                       example: http://localhost:3000/uploads/a1b2c3d4.jpg
 *                     storage:
 *                       type: string
 *                       example: local
 *       400:
 *         description: Validation error (no file, wrong type, or too large)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/upload", upload.single("file"), uploadFile);

/**
 * @swagger
 * /api/upload/multiple:
 *   post:
 *     summary: Upload multiple files (max 5)
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - files
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Up to 5 files at once
 *     responses:
 *       201:
 *         description: Files uploaded successfully
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/upload/multiple", upload.array("files", 5), uploadMultipleFiles);

/**
 * @swagger
 * /api/files:
 *   get:
 *     summary: List all uploaded files (local or Cloudinary)
 *     tags: [Upload]
 *     responses:
 *       200:
 *         description: File list retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: number
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       filename:
 *                         type: string
 *                       url:
 *                         type: string
 *                       size:
 *                         type: number
 */
router.get("/files", listFiles);

/**
 * @swagger
 * /api/files/{filename}:
 *   delete:
 *     summary: Delete a file by filename
 *     tags: [Upload]
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: The filename to delete (e.g. a1b2c3d4.jpg)
 *     responses:
 *       200:
 *         description: File deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: File deleted successfully
 *       404:
 *         description: File not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/files/:filename", deleteFile);

/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         error:
 *           type: string
 *           example: Something went wrong
 */

module.exports = router;
