const express=require('express')
const {register, login, logout} = require('../controllers/authCont')
const {validator,registerRules, loginRules} =require('../middelware/validator')
const router=express.Router()


router.post('/register',registerRules,validator, register)
router.post('/login',loginRules,validator, login)
router.get('/logout',logout)



module.exports=router