const express = require("express");
const router = express.Router();
const { signRender, signUp } = require("../controllers/sign");

router.get("/", signRender);
router.post("/signup", signUp);

module.exports = router;
