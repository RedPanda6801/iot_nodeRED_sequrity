const express = require("express");
const router = express.Router();
const { mainRender, openChecker } = require("../controllers/main");
const { verifyToken } = require("../libs/middleware");
router.get("/", mainRender);
router.post("/open", verifyToken, openChecker);

module.exports = router;
