const Post =require ("../models/Post")
const User =require ("../models/User")
const ObjectID = require("mongoose").Types.ObjectId;

/* CREATE */
module.exports.createPoste = async (req, res) => {
  
   
    const newPost = new Post({
     posterId:req.body.posterId,
     message:req.body.message,
     picture:req.file?.filename,
     
      likers: [],
      comments: [],
    });
    
    try {
      const post = await newPost.save()
      return res.status(201).json(post)
    } catch (err) {
      res.status(400).send(err)
    }
    
    
   
  
}

/* READ */
module.exports.readPost = async (req, res) => {
  try {
    const post = await Post.find().populate("posterId").sort({createdAt: -1})
    res.send(docs)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

module.exports.getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params
    const post = await Post.find({ userId })
    res.status(200).json(post)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

/* UPDATE */
module.exports.likePost = async (req, res) => {
  try {
    const { id } = req.params
    const { userId } = req.body
    const post = await Post.findById(id)
    const isLiked = post.likes.get(userId)

    if (isLiked) {
      post.likes.delete(userId)
    } else {
      post.likes.set(userId, true)
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    )

    res.status(200).json(updatedPost)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}