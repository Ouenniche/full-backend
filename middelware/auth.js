// const jwt=require('jsonwebtoken')

// exports.verifyToken = async (req, res, next) => {
//     try {
//       const token = req.header("Authorization");
  
//       if (!token) {
//         return res.status(403).send("Access Denied");
//       }
  
//       if (token.startsWith("Bearer ")) {
//         token = token.slice(7, token.length).trimLeft();
//       }
  
//       const verified = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = verified;
//       next();
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   }
  

const jwt=require('jsonwebtoken')
const isAuth=async(req,res,next)=>{
    try {
        const token=req.headers["authorization"]
        if(!token){
            return res.status(401).json({errors:[{msg:"unauthorized access"}]})
        }KEY
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        if(!decoded){
            return res.status(401).json({errors:[{msg:"unauthorized access"}]})
        }          
        req.user={
            id:decoded.id
        }
        next()
    } catch (error) {
        res.status(401).json({errors:[{msg:"unauthorized access"}]})
    }
}

module.exports=isAuth