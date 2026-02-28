const express = require("express");
const cors = require("cors");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const config = require("./config");
const swaggerSpec = require("./config/swagger");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

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
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "File Upload API is running",
    docs: "/api-docs",
    storageMode: config.storageMode,
    maxFileSizeMb: config.maxFileSizeMb,
  });
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
