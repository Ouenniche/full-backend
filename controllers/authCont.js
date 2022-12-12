const User = require("../models/User");
const bcrypt = require('bcrypt')


//signein
exports.register=async(req,res)=>{
    const {firstName,lastName,email,password} = req.body
        try {
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
        
            const newUser = new User({
              firstName,
              lastName,
              email,
              password: passwordHash,
            //   friends,
            //   location,
            //   occupation,
            //   viewedProfile: Math.floor(Math.random() * 10000),
            //   impressions: Math.floor(Math.random() * 10000),
            })
            await newUser.save();
            res.status(200).json({msg:'user created succefully'});
          } catch (err) {
            res.status(501).json('it dosent work');
          }
}

//login
exports.login=async(req,res)=>{
  
  try {
    const { email, password } = req.body
    const checkuser=await User.findOne({email})
    if (!checkuser){
        return res.status(401).json({errors:[{msg:"not valide Email"}]})
    }
    const isMatch= await bcrypt.compare(password, checkuser.password)
    if (!isMatch){
        return res.status(400).json({errors:[{msg:"not valide Password"}]})
    }
    const payload={
        id:checkuser._id
    }
    const token=jwt.sign(payload,process.env.secret_key,{expiresIn:'3d'})

    res.status(200).json({checkuser,msg:"you are connected successfully",token})

} catch (error) {
    res.status(500).send('server error')
}
}