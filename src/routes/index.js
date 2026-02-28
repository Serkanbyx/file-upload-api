const { Router } = require("express");
const uploadRoutes = require("./uploadRoutes");

const router = Router();

router.use("/", uploadRoutes);

module.exports = router;
