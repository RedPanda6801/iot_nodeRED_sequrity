const express = require("express");
const path = require("path");
const router = express.Router();
const mqtt = require("mqtt");
const fs = require("fs");

router.get("/", async (req, res) => {
  try {
    const client = mqtt.connect("mqtt://192.168.0.122");
    client.on("connect", function () {
      console.log("Connection Success");
      client.subscribe("topic", function (err) {
        if (!err) {
        }
      });
      client.publish("btn", "close");
    });
    client.on("message", function (topic, message) {
      // message is Buffer
      console.log(message);
      fs.writeFileSync("uploads/new-path.jpg", message);
    });
    return res.sendFile(path.join(__dirname, "../views/phone.html"));
  } catch (error) {
    console.log(error);
  }
});
// router.post("/btn", async (req, res) => {
//   try {
//     console.log(req.body);
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;
