const swaggerJsDoc = require("swagger-jsdoc");
const config = require("./index");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "File Upload API",
      version: "1.0.0",
      description:
        "A REST API for secure file uploads with type/size validation, local and Cloudinary storage support.",
      contact: {
        name: "API Support",
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

module.exports = swaggerSpec;
