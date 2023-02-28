const express=require("express");
const { authController } = require("../controllers/auth");

const router=express.Router();


router.post('',authController.login)
router.post('',authController.register)
router.post('',authController.logout)

module.exports=router