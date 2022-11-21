const { User } = require("../models");
const bcrypt = require("bcrypt");
const path = require("path");

// 초기화면. 로그인 페이지를 렌더링해주는 메소드
exports.loginRender = async (req, res, next) => {
  try {
    // 회원가입이 없어 DB 초기화를 위한 코드
    const users = await User.findAll({});
    if (users.length === 0) {
      const hash = await bcrypt.hash("1234", 12);
      const createRoot = await User.create({
        userId: "root",
        password: hash,
        name: "루트계정",
        ownerPhone: "010-1234-5678",
      });
    }
    // 로그인 페이지 렌더링
    return res.sendFile(path.join(__dirname, "../views/login.html"));
  } catch (error) {
    console.log(error);
    // 에러처리 미들웨어로 넘어감
    next(error);
  }
};

// 로그인을 확인해주는 메소드
exports.loginChecker = async (req, res) => {
  try {
    // body로 아이디, 비밀번호를 받음
    const { userId, password } = req.body;
    // body 데이터에 대해 빈값이 들어왔을 때의 Validation 처리
    if (!userId || !password) {
      console.log("Empty Body");
      return res.status(400).send("Bad Request");
    }
    // 아이디로 우선 검색
    const user = await User.findOne({ where: { userId } });
    if (!user) {
      console.log("Id is Wrong!");
      return res.status(400).send("Bad Request");
    }
    // 아이디가 있으면 해시화된 비밀번호를 비교
    const checkout = await bcrypt.compare(password, user.password);
    if (checkout) {
      console.log("logged in!");
      return res.status(200).send("Response Success");
    } else {
      // 비밀번호가 다르면 에러처리
      console.error("Wrong Password");
      return res.status(400).send("Bad Request");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
