const express=require('express')
const router=express.Router()
const { getUser,getUserFriends,addRemoveFriend } =require('../controllers/authUser')
const {verifyToken} =require('../middelware/auth')


router.get("/:id", getUser)
router.get("/:id/friends", getUserFriends)

/* UPDATE */
router.patch("/:id/:friendId", addRemoveFriend)
module.exports=router