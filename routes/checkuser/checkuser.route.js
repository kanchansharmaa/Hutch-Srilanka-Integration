const {getUserSubscriptionStatus  } = require("./checkusre.controller");

const router = require("express").Router();

router.get("/", getUserSubscriptionStatus);

module.exports = router;