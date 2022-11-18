const express = require("express");
const router = express.Router();
const { loginRender, loginChecker } = require("../controllers/auth");

router.get("/", loginRender);
router.post("/auth", loginChecker);

module.exports = router;
