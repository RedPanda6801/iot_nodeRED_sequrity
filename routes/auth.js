const express = require("express");
const { User } = require("../models");
const router = express.Router();
const bcrypt = require("bcrypt");
const path = require("path");

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({});
    console.log(users);
    if (users.length === 0) {
      const hash = await bcrypt.hash("1234", 12);
      const createRoot = await User.create({
        userId: "root",
        password: hash,
        name: "루트계정",
        ownerPhone: "010-1234-5678",
      });
      console.log(createRoot);
    }
    return res.sendFile(path.join(__dirname, "../views/login.html"));
  } catch (error) {
    console.log(error);
  }
});
router.post("/auth", async (req, res) => {
  try {
    const { userId, password } = req.body;
    if (!userId || !password) {
      console.log("Empty Body");
      return res.status(400).send("Bad Request");
    }
    const user = await User.findOne({ where: { userId } });
    if (!user) {
      console.log("Id is Wrong!");
      return res.status(400).send("Bad Request");
    }
    const checkout = await bcrypt.compare(password, user.password);
    if (checkout) {
      console.log("logged in!");
      return res.status(200).send("Response Success");
    } else {
      console.error("Wrong Password");
      return res.status(400).send("Bad Request");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
