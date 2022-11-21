const express = require("express");
const router = express.Router();
const { loginRender, loginChecker } = require("../controllers/login");

router.get("/", loginRender);
router.post("/login", loginChecker);

module.exports = router;
