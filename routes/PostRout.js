const express = require('express')
const router=express.Router()
const { readPost, getUserPosts, likePost } = require("../controllers/authPost")
const { verifyToken } = require('../middelware/auth')

// verifyToken,
router.get("/",  readPost)

router.get("/:userId/posts",  getUserPosts)

/* UPDATE */
router.patch("/:id/like",  likePost)
module.exports=router