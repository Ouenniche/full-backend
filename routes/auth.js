const express=require('express')
const {register, login} = require('../controllers/authCont')
const {validator,registerRules, loginRules} =require('../middelware/validator')
const router=express.Router()


router.post('/register',validator,registerRules, register)
router.post('/login',validator,loginRules,login)


module.exports=router