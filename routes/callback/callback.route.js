const {getCallback} =require('./callback.controller')

const router = require("express").Router();

router.post("/", getCallback);

module.exports = router;

