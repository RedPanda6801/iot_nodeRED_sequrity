const express = require("express");
const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const mqtt = require("mqtt");
dotenv.config();

// 라우터 불러오기
const mainRouter = require("./routes/main");
const app = express();
app.set("port", process.env.PORT || 8002);
app.use(morgan("dev"));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
  })
);
// 라우터 설정
app.use("/", mainRouter);
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});


// 라즈베리파이에서 버튼을 누르면 사진을 찍어 저장
// 찍은 사진을 보내서 서버에 이미지로 저장
// 프론트에서 버튼을 누르면 라즈베리로 데이터를 전송
// 데이터를 확인하여 LED를 켜줌
