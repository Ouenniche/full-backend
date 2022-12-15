const User = require("../models/User");
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({id}, process.env.PRIVATE_TOKEN, {
      expiresIn: maxAge
    })
  };


//signup

exports.register=async(req,res)=>{
  const {firstName,lastName,email,password} = req.body
  try {
      // check user
      const checkuser=await User.findOne({email})
      if(checkuser){
          return res.status(401).json({errors:[{msg:"utilisateur existe déja"}]})
      }
      const user= new User({
        firstName,lastName,email,password
      })
      user.password=await bcrypt.hash(password,10)
      await user.save()

      //generate Token

      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true,maxAge });
   


      res.status(200).json({user,msg:"utilisateur crée"})
  } catch (error) {
      res.status(500).send('server error')
  }
}

//login


exports.login=async(req,res)=>{
  const {email,password}=req.body
  try {
      const user=await User.findOne({email})
      if(!user){
          return res.status(400).json({errors:[{msg:"bad credentials"}]})
      }
      const isMatch=await bcrypt.compare(password,user.password)
      if(!isMatch){
          return res.status(400).json({errors:[{msg:"bad credentials"}]})
      }

   // generate token
   const token = createToken(user._id);
   res.cookie('jwt', token, { httpOnly: true,maxAge });

      res.status(200).json({user,msg:"login with success"})
  } catch (error) {
      res.status(500).send('server error')
  }

  
}

//Logout

exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}