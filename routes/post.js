import express from "express"
import {getFeedPost, getUserPost,createPost, likePost,getUserPostDetail,dislikePost,comment} from '../controllers/post.js'
import  {verifyToken} from "../middleware/auth.js"
const router=express.Router()


// Read
router.get("/", getFeedPost);
router.post("/",createPost)
router.get("/:userId/post",getUserPost);
// router.get("/:id/:userId",getUserId)
router.get("/:id",getUserPostDetail)


// Update

router.post("/:id/like",likePost)
router.put("/:id/dislike",dislikePost);

// Commets
router.put("/:id/comments", comment);

export default router