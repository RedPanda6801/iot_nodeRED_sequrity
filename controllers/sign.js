const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
exports.signRender = async (req, res) => {
  try {
    return res.sendFile(path.join(__dirname, "../views/signup.html"));
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.signUp = async (req, res, next) => {
  try {
    // 들어온 값을 변수로 저장
    const { id, password, name, phone } = req.body;
    // 들어온 값이 유효한지 확인
    if (!id || !password || !name || !phone) {
      console.error("More data is Required");
      return res.status(400).send("Bad Request");
    }
    // 중복되는 id를 DB에서 확인
    const isUser = await User.findOne({ where: { userId: id } });
    if (isUser) {
      console.error("User is Already Exsisted");
      return res.status(400).send("Already Existed");
    }
    // 암호화
    const hash = await bcrypt.hash(password, 12);
    const createUser = await User.create({
      userId: id,
      password: hash,
      name,
      ownerPhone: phone,
    });
    return res.status(200).json({
      message: "Create Success",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
