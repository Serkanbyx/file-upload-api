[![Created by Serkanby](https://img.shields.io/badge/Created%20by-Serkanby-blue?style=flat-square)](https://serkanbayraktar.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Serkanbyx-181717?style=flat-square&logo=github)](https://github.com/Serkanbyx)

# File Upload API

A secure REST API for file uploads built with **Express**, **Multer**, and **Swagger**. Supports both local disk storage and **Cloudinary** cloud storage.

## Features

- **Single & multiple file upload** (up to 5 files at once)
- **File type validation** — only images, PDFs, and documents allowed
- **File size limit** — configurable (default 5 MB)
- **Dual storage** — toggle between local disk and Cloudinary
- **Swagger UI** — interactive API documentation
- **Error handling** — clean, consistent JSON error responses

## Tech Stack

| Tool | Purpose |
|------|---------|
| Express | Web framework |
| Multer | File upload middleware |
| Cloudinary | Cloud storage (optional) |
| Swagger | API documentation |
| dotenv | Environment variables |

## Project Structure

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

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3000 | Server port |
| `STORAGE_MODE` | local | `local` or `cloudinary` |
| `MAX_FILE_SIZE_MB` | 5 | Max upload size in MB |
| `CLOUDINARY_CLOUD_NAME` | — | Required for cloudinary mode |
| `CLOUDINARY_API_KEY` | — | Required for cloudinary mode |
| `CLOUDINARY_API_SECRET` | — | Required for cloudinary mode |

### 3. Run the server

```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

### 4. Open Swagger docs

Visit [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/upload` | Upload a single file |
| `POST` | `/api/upload/multiple` | Upload multiple files (max 5) |
| `GET` | `/api/files` | List all uploaded files |
| `DELETE` | `/api/files/:filename` | Delete a file by filename |

### Example: Upload a file with cURL

```bash
curl -X POST http://localhost:3000/api/upload \
  -F "file=@./photo.jpg"
```

### Allowed File Types

- Images: `JPEG`, `PNG`, `GIF`, `WebP`
- Documents: `PDF`, `TXT`, `DOC`, `DOCX`

## Deploy to Render

1. Push your code to a GitHub repository
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repo
4. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add environment variables in the Render dashboard:
   - `PORT` = `3000`
   - `STORAGE_MODE` = `cloudinary` (recommended for Render since local storage is ephemeral)
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
6. Deploy!

> **Note:** Render's free tier uses ephemeral storage, so uploaded files in `local` mode will be lost on redeploy. Use `cloudinary` mode for persistent storage.

## Developer

**Serkanby**

- Website: [serkanbayraktar.com](https://serkanbayraktar.com/)
- GitHub: [@Serkanbyx](https://github.com/Serkanbyx)
- Email: [serkanbyx1@gmail.com](mailto:serkanbyx1@gmail.com)

## Contact

- [Open an Issue](https://github.com/Serkanbyx/file-upload-api/issues)
- Email: [serkanbyx1@gmail.com](mailto:serkanbyx1@gmail.com)
- Website: [serkanbayraktar.com](https://serkanbayraktar.com/)
