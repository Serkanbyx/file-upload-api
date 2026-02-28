const express = require("express");
const cors = require("cors");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const config = require("./config");
const swaggerSpec = require("./config/swagger");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const { version } = require("../package.json");

const app = express();

/* ── Core middleware ── */
app.use(cors());
app.use(express.json());

/* ── Serve uploaded files statically ── */
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

/* ── Swagger docs ── */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* ── API routes ── */
app.use("/api", routes);

/* ── Health check ── */
app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "File Upload API is running",
    storageMode: config.storageMode,
    maxFileSizeMb: config.maxFileSizeMb,
  });
});

/* ── Welcome page ── */
app.get("/", (_req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>File Upload API</title>
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
      background: #0b1120;
      background-image:
        radial-gradient(ellipse 80% 60% at 50% -20%, rgba(56, 189, 248, 0.12) 0%, transparent 70%),
        repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(56, 189, 248, 0.04) 39px, rgba(56, 189, 248, 0.04) 40px),
        repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(56, 189, 248, 0.04) 39px, rgba(56, 189, 248, 0.04) 40px);
      color: #e2e8f0;
      overflow: hidden;
      position: relative;
    }

    body::before {
      content: "";
      position: absolute;
      top: 15%;
      left: 8%;
      width: 80px;
      height: 100px;
      border: 2px solid rgba(56, 189, 248, 0.08);
      border-radius: 4px 4px 4px 4px;
      transform: rotate(-12deg);
      animation: floatDoc 8s ease-in-out infinite;
    }
    body::before {
      background:
        linear-gradient(90deg, transparent 0%, transparent 20%, rgba(56, 189, 248, 0.06) 20%, rgba(56, 189, 248, 0.06) 80%, transparent 80%);
    }

    body::after {
      content: "";
      position: absolute;
      bottom: 12%;
      right: 10%;
      width: 64px;
      height: 80px;
      border: 2px solid rgba(139, 92, 246, 0.1);
      border-radius: 4px;
      transform: rotate(8deg);
      animation: floatDoc 10s ease-in-out infinite reverse;
    }

    @keyframes floatDoc {
      0%, 100% { transform: rotate(-12deg) translateY(0); }
      50% { transform: rotate(-12deg) translateY(-18px); }
    }

    .container {
      text-align: center;
      padding: 3rem 2rem;
      max-width: 520px;
      width: 90%;
      position: relative;
      z-index: 1;
    }

    .upload-icon {
      width: 88px;
      height: 88px;
      margin: 0 auto 2rem;
      position: relative;
      background: linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(139, 92, 246, 0.1));
      border: 2px dashed rgba(56, 189, 248, 0.3);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .upload-icon::before {
      content: "";
      width: 3px;
      height: 28px;
      background: linear-gradient(to top, #38bdf8, #818cf8);
      border-radius: 2px;
      position: absolute;
      top: 22px;
      animation: arrowPulse 2s ease-in-out infinite;
    }

    .upload-icon::after {
      content: "";
      width: 16px;
      height: 16px;
      border-left: 3px solid #38bdf8;
      border-top: 3px solid #818cf8;
      transform: rotate(45deg);
      position: absolute;
      top: 20px;
      border-radius: 2px 0 0 0;
      animation: arrowPulse 2s ease-in-out infinite;
    }

    @keyframes arrowPulse {
      0%, 100% { opacity: 0.7; transform: translateY(0) rotate(45deg); }
      50% { opacity: 1; transform: translateY(-5px) rotate(45deg); }
    }
    .upload-icon::before {
      animation: barPulse 2s ease-in-out infinite;
    }
    @keyframes barPulse {
      0%, 100% { opacity: 0.7; transform: translateY(0); }
      50% { opacity: 1; transform: translateY(-5px); }
    }

    .upload-icon .base-line {
      position: absolute;
      bottom: 18px;
      width: 30px;
      height: 3px;
      background: linear-gradient(90deg, #38bdf8, #818cf8);
      border-radius: 2px;
    }

    h1 {
      font-size: 2rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      background: linear-gradient(135deg, #e2e8f0 0%, #38bdf8 50%, #818cf8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.5rem;
    }

    .version {
      font-family: "Cascadia Code", "Fira Code", "JetBrains Mono", monospace;
      font-size: 0.85rem;
      color: #64748b;
      letter-spacing: 0.08em;
      margin-bottom: 2.5rem;
    }

    .links {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 3rem;
    }

    .links a {
      display: block;
      padding: 0.85rem 1.5rem;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.95rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .btn-primary {
      background: linear-gradient(135deg, #0ea5e9, #6366f1);
      color: #fff;
      box-shadow: 0 4px 20px rgba(56, 189, 248, 0.2), 0 0 0 1px rgba(56, 189, 248, 0.1);
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(56, 189, 248, 0.35), 0 0 0 1px rgba(56, 189, 248, 0.2);
    }

    .btn-secondary {
      background: rgba(56, 189, 248, 0.06);
      color: #94a3b8;
      border: 1px solid rgba(56, 189, 248, 0.15);
      backdrop-filter: blur(8px);
    }
    .btn-secondary:hover {
      background: rgba(56, 189, 248, 0.12);
      color: #e2e8f0;
      border-color: rgba(56, 189, 248, 0.3);
      transform: translateY(-2px);
    }

    .sign {
      font-size: 0.8rem;
      color: #475569;
      letter-spacing: 0.02em;
    }
    .sign a {
      color: #38bdf8;
      text-decoration: none;
      transition: color 0.2s;
    }
    .sign a:hover {
      color: #818cf8;
    }

    @media (max-width: 480px) {
      h1 { font-size: 1.6rem; }
      .container { padding: 2rem 1.25rem; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="upload-icon">
      <span class="base-line"></span>
    </div>
    <h1>File Upload API</h1>
    <p class="version">v${version}</p>
    <div class="links">
      <a href="/api-docs" class="btn-primary">API Documentation</a>
      <a href="/api/health" class="btn-secondary">Health Check</a>
    </div>
    <footer class="sign">
      Created by
      <a href="https://serkanbayraktar.com/" target="_blank" rel="noopener noreferrer">Serkanby</a>
      |
      <a href="https://github.com/Serkanbyx" target="_blank" rel="noopener noreferrer">Github</a>
    </footer>
  </div>
</body>
</html>`);
});

/* ── Global error handler (must be last) ── */
app.use(errorHandler);

/* ── Start server ── */
app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
  console.log(`Swagger docs: http://localhost:${config.port}/api-docs`);
  console.log(`Storage mode: ${config.storageMode}`);
});

module.exports = app;
