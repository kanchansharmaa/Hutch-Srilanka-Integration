const { registerOTP } = require("./registerOTP.controller");

const router = require("express").Router();

router.post("/", registerOTP);

module.exports = router;
