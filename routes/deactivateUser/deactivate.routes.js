const { DeactivateUser } = require("./deactivate.controller");

const router = require("express").Router();

router.post("/", DeactivateUser);

module.exports = router;
