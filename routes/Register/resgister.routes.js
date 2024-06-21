const express = require('express')
const {RegisterUser} = require("./resgister.controller")

 const router = express.Router()
 router.post("/",RegisterUser)

 module.exports=router;
