const express=require("express");
const { userController } = require("../controllers/user");

const router=express.Router();


router.get('/test',userController.getUser)

module.exports=router