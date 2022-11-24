const express = require("express");
const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();

// 라우팅
const mainRouter = require("./routes/main");
const loginRouter = require("./routes/login");
const signRouter = require("./routes/sign");
const app = express();

// 사용자 로그인을 위한 DB의 ORM
const { sequelize } = require("./models");
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });
app.use;
// 서버 포트 번호 설정
app.set("port", process.env.PORT || 8002);
app.use(morgan("dev"));
// 정적파일을 읽는 미들웨어
app.use("/public", express.static(path.join(__dirname, "public")));
// json parsing 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  cors({
    credentials: true,
  })
);
// 라우터 미들웨어
app.use("/main", mainRouter);
app.use("/", loginRouter);
app.use("/sign", signRouter);
// 404 처리 미들웨어
app.use((req, res, next) => {
  if (res.statusCode !== 500) {
    const error = "Not Found";
    console.error(`Router Not Found! - ${req.method}${req.url}`);
    return res.status(error.code).json(error);
  } else next();
});

// 500 처리 미들웨어
app.use((err, req, res) => {
  console.log(req.query.error);
  console.log("error name - ", err.name || "notFound");
  res.locals.message = err.message;
  let response = {};
  if (err.name === "SequelizeDatabaseError") {
    response.message = "DB ERROR";
  } else if (err.name === "TypeError") {
    response.massage = "TypeError - dataType problem or DB is not allowed Null";
  }
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500).json(response || err);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
