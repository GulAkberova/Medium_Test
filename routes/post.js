import express from "express"
import {getFeedPost, getUserPost, likePost,getUserPostDetail} from '../controllers/post.js'
import  {verifyToken} from "../middleware/auth.js"
const router=express.Router()


// Read
router.get("/", getFeedPost);
router.get("/:userId/post",getUserPost);
router.get("/:id",getUserPostDetail)

// Update

router.patch("/:id/like",likePost)


export default router