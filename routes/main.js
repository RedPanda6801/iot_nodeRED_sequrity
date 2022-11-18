const express = require("express");
const router = express.Router();
const { mainRender, openChecker } = require("../controllers/main");

router.get("/", mainRender);
router.post("/open", openChecker);

module.exports = router;
