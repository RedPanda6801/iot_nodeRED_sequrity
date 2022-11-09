const express = require("express");
const path = require("path");
// 라우터 불러오기
const mainRouter = require("./routes/main");
const app = express();
app.set("port", process.env.PORT || 8002);
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 라우터 설정
app.use("/", mainRouter);
// 404 NOT FOUND
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
