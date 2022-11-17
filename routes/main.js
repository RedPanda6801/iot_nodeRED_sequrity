const express = require("express");
const path = require("path");
const router = express.Router();
const mqtt = require("mqtt");
const fs = require("fs");

router.get("/", async (req, res) => {
  try {
    console.log("hello");
    const client = mqtt.connect("mqtt://192.168.0.122");
    client.on("connect", function () {
      console.log("Connection Success");
      client.subscribe("topic", function (err) {
        if (!err) {
        }
      });
      client.subscribe("open", function (err) {
        if (err) console.log(err);
      });
    });
    client.on("message", function (topic, message) {
      // message is Buffer
      console.log(topic);
      switch (topic) {
        case "open":
          console.log(message.toString());
          break;
        case "topic":
          console.log("picture save");
          const buffer = message.toString("base64");
          const picture = Buffer.from(buffer, "base64");
          fs.writeFileSync("public/new-path.jpg", picture);
          break;
      }
    });
    return res.sendFile(path.join(__dirname, "../views/phone.html"));
  } catch (error) {
    console.log(error);
  }
});
router.post("/open", async (req, res) => {
  try {
    const client = mqtt.connect("mqtt://192.168.0.122");
    const { open } = req.body;
    client.publish("open", open);
    return res.status(200).send("btn ok");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
