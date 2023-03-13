import express from 'express'
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
    getAllUser,
    unfollowUser,
    followUser,
    savePost

}from "../controllers/user.js"
import { verifyToken } from '../middleware/auth.js'

const router =express.Router()

// Read
router.get("/",getAllUser);
router.get("/:id",getUser)
router.get("/:id/friends",getUserFriends)

// Update
router.patch("/:id/:friendId",addRemoveFriend)


// Follow
router.post("/follow",followUser);
router.post("/unfollow", unfollowUser);


router.post("/:id/save-post/:postId", savePost);
export default router