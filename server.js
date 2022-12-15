require('dotenv').config()
const express = require('express')
const connectDB = require('./config/connectDB')
const cookieParser = require('cookie-parser')

const app = express()
const authRoutes=require('./routes/auth')
const userRoutes=require('./routes/UserRout')
const postRoutes=require('./routes/PostRout')
const isAuth = require('./middelware/auth')
const port =process.env.PORT || 5000


connectDB()

app.use(express.json())
app.use(cookieParser());
 app.get('*',isAuth )
 app.get('/jwtid', isAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
  });

  
app.use('/api/auth',authRoutes)
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(port,()=>console.log(`server is runing on port ${port}`))