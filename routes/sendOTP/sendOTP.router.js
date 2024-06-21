const { sendOTPController } = require("./sendOTP.controller");

const router = require("express").Router();

router.post("/", sendOTPController);

module.exports = router;
