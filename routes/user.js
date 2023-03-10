import express from 'express'
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
    getAllUser,

}from "../controllers/user.js"
import { verifyToken } from '../middleware/auth.js'

const router =express.Router()

// Read
router.get("/",getAllUser);
router.get("/:id",getUser)
router.get("/:id/friends",getUserFriends)

// Update
router.patch("/:id/:friendId",addRemoveFriend)




export default router