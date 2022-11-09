const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    return res.sendFile(path.join(__dirname, "../views/phone.html"));
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
