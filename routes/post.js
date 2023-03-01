import express from "express"
import {getFeedPost, getUserPost, likePost} from '../controllers/post.js'
import  {verifyToken} from "../middleware/auth.js"
const router=express.Router()


// Read
router.get("/",verifyToken, getFeedPost);
router.get("/:userId/post",verifyToken,getUserPost);


// Update

router.patch("/:id/like",verifyToken,likePost)


export default router