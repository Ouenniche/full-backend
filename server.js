require('dotenv').config()
const express = require('express')
const connectDB = require('./config/connectDB')


const app = express()
const authRoutes=require('./routes/auth')
const userRoutes=require('./routes/UserRout')
const postRoutes=require('./routes/PostRout')
const isAuth = require('./middelware/auth')
const port =process.env.PORT || 5000


connectDB()

app.use(express.json())
app.get('*',isAuth )

app.use('/api/auth',authRoutes)
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(port,()=>console.log(`server is runing on port ${port}`))