# 📁 File Upload API

A secure, production-ready REST API for file uploads built with Express, Multer, and Swagger. Supports both local disk storage and Cloudinary cloud storage with file type validation and size limits.

[![Created by Serkanby](https://img.shields.io/badge/Created%20by-Serkanby-blue?style=flat-square)](https://serkanbayraktar.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Serkanbyx-181717?style=flat-square&logo=github)](https://github.com/Serkanbyx)

## Features

- **Single & Multiple File Upload**: Upload one file or up to 5 files at once with a single request
- **File Type Validation**: Only allows safe file types — images (JPEG, PNG, GIF, WebP) and documents (PDF, TXT, DOC, DOCX)
- **Configurable File Size Limit**: Set maximum upload size per file (default 5 MB) via environment variables
- **Dual Storage Mode**: Seamlessly switch between local disk storage and Cloudinary cloud storage
- **Interactive API Documentation**: Full Swagger UI with try-it-out functionality for every endpoint
- **Consistent Error Handling**: Clean, structured JSON error responses with proper HTTP status codes
- **Health Check Endpoint**: Monitor API status, storage mode, and configuration at a glance
- **CORS Enabled**: Cross-origin requests supported out of the box
- **Production Ready**: Deployed on Render with Cloudinary integration for persistent cloud storage

## Live Demo

[🚀 View Live Demo](https://file-upload-api-bnql.onrender.com/)

[📖 API Documentation (Swagger)](https://file-upload-api-bnql.onrender.com/api-docs)

## Technologies

- **Express 5**: Fast, minimalist web framework for Node.js
- **Multer 2**: Middleware for handling `multipart/form-data` file uploads
- **Cloudinary**: Cloud-based image and file storage service
- **Swagger (OpenAPI 3.0)**: Interactive API documentation with `swagger-jsdoc` and `swagger-ui-express`
- **dotenv**: Environment variable management from `.env` files
- **CORS**: Cross-Origin Resource Sharing middleware
- **UUID**: Unique filename generation to prevent collisions
- **Node.js 18+**: JavaScript runtime with modern ES features

## Installation

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/Serkanbyx/file-upload-api.git
cd file-upload-api
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env
```

4. Configure your `.env` file:

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3000 | Server port |
| `NODE_ENV` | development | `development` or `production` (controls Swagger server URL) |
| `BASE_URL` | http://localhost:3000 | Public base URL used in production (e.g. your Render URL) |
| `STORAGE_MODE` | local | `local` or `cloudinary` |
| `MAX_FILE_SIZE_MB` | 5 | Max upload size in MB |
| `CLOUDINARY_CLOUD_NAME` | — | Required for cloudinary mode |
| `CLOUDINARY_API_KEY` | — | Required for cloudinary mode |
| `CLOUDINARY_API_SECRET` | — | Required for cloudinary mode |

5. Start the server:

```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

6. Open the API docs at [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Usage

1. Start the server with `npm run dev`
2. Open Swagger UI at `http://localhost:3000/api-docs` to explore all endpoints interactively
3. Upload a single file via `POST /api/upload` by attaching a file with the `file` field
4. Upload multiple files via `POST /api/upload/multiple` (up to 5 files per request)
5. List all uploaded files via `GET /api/files`
6. Delete a specific file via `DELETE /api/files/:filename`
7. Check API health status via `GET /api/health`

## How It Works?

### File Upload Flow

When a file is uploaded, the API processes it through a middleware pipeline:

```
Client Request → CORS → Multer Middleware → Validation → Controller → Storage → Response
```

### Storage Modes

The API supports two storage backends configured via the `STORAGE_MODE` environment variable:

- **Local Mode**: Files are saved to the `uploads/` directory and served statically via Express
- **Cloudinary Mode**: Files are uploaded directly to Cloudinary cloud storage, ideal for production deployments where local storage is ephemeral. Listing (`GET /api/files`) and deletion are handled via the Cloudinary Admin API

### File Validation

Multer middleware validates each upload before processing:

```javascript
// Allowed MIME types
const ALLOWED_TYPES = [
  "image/jpeg", "image/png", "image/gif", "image/webp",
  "application/pdf", "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];
```

### Project Structure

```
src/
├── config/
│   ├── index.js          # Central configuration
│   ├── cloudinary.js      # Cloudinary setup
│   └── swagger.js         # Swagger/OpenAPI config
├── controllers/
│   └── uploadController.js
├── middlewares/
│   ├── upload.js          # Multer middleware
│   └── errorHandler.js    # Global error handler
├── routes/
│   ├── index.js
│   └── uploadRoutes.js    # Route definitions + Swagger JSDoc
├── utils/
│   ├── ApiError.js        # Custom error class
│   └── fileHelpers.js     # File utility functions
└── server.js              # App entry point
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/upload` | Upload a single file |
| `POST` | `/api/upload/multiple` | Upload multiple files (max 5) |
| `GET` | `/api/files` | List all uploaded files (local disk or Cloudinary) |
| `DELETE` | `/api/files/:filename` | Delete a file by filename |
| `GET` | `/api/health` | Health check with status info |

### Example: Upload a file with cURL

```bash
curl -X POST https://file-upload-api-bnql.onrender.com/api/upload \
  -F "file=@./photo.jpg"
```

### Example: Upload multiple files

```bash
curl -X POST https://file-upload-api-bnql.onrender.com/api/upload/multiple \
  -F "files=@./photo1.jpg" \
  -F "files=@./photo2.png" \
  -F "files=@./document.pdf"
```

### Allowed File Types

- **Images**: JPEG, PNG, GIF, WebP
- **Documents**: PDF, TXT, DOC, DOCX

## Customization

### Change Maximum File Size

Update the `MAX_FILE_SIZE_MB` variable in your `.env` file:

```env
MAX_FILE_SIZE_MB=10
```

### Switch Storage Mode

Toggle between local and cloud storage:

```env
# Local disk storage
STORAGE_MODE=local

# Cloudinary cloud storage
STORAGE_MODE=cloudinary
```

### Add New Allowed File Types

Extend the allowed MIME types array in `src/middlewares/upload.js`:

```javascript
const ALLOWED_TYPES = [
  // existing types...
  "application/zip",
  "application/x-rar-compressed",
];
```

## Deploy to Render

1. Push your code to a GitHub repository
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repo
4. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables in the Render dashboard:
   - `PORT` = `3000`
   - `STORAGE_MODE` = `cloudinary` (recommended — Render's free tier uses ephemeral storage)
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
6. Deploy!

> **Note:** Render's free tier uses ephemeral storage, so uploaded files in `local` mode will be lost on redeploy. Use `cloudinary` mode for persistent storage.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/amazing-feature`
3. Commit your changes: `git commit -m "feat: add amazing feature"`
4. Push to the branch: `git push origin feat/amazing-feature`
5. Open a Pull Request

### Commit Message Format

- `feat:` — New feature
- `fix:` — Bug fix
- `refactor:` — Code refactoring
- `docs:` — Documentation changes
- `chore:` — Maintenance tasks

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## Developer

**Serkanby**

- Website: [serkanbayraktar.com](https://serkanbayraktar.com/)
- GitHub: [@Serkanbyx](https://github.com/Serkanbyx)
- Email: [serkanbyx1@gmail.com](mailto:serkanbyx1@gmail.com)

## Contact

- [Open an Issue](https://github.com/Serkanbyx/file-upload-api/issues)
- Email: [serkanbyx1@gmail.com](mailto:serkanbyx1@gmail.com)
- Website: [serkanbayraktar.com](https://serkanbayraktar.com/)

---

⭐ If you like this project, don't forget to give it a star!
