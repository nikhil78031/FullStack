const express = require("express");
const router = express.Router();
const {posts,Likes} = require('../models');
const {validateToken} = require("../middlewares/AuthMiddleware")


router.get("/",validateToken,async(req,res)=>{
  const listofposts = await posts.findAll({include :[Likes]}); // Join 
  const likedposts = await Likes.findAll({where:{UserId: req.user.id}});
  res.json({listofposts:listofposts,likedposts:likedposts});
    
});

router.get("/byuserId/:id",async(req,res)=>{
  
  const id = req.params.id;
  const lisofpost = await posts.findAll({where:{UserId:id},include :[Likes]});
  res.json(lisofpost);
    
});

router.get("/byId/:id",async(req,res)=>{
  
  const id = req.params.id;
  const post = await posts.findByPk(id);
  res.json(post);
    
});


router.post("/",validateToken,async(req,res)=>{

    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id;
    await posts.create(post);
    res.json(post);
});

router.put("/title",validateToken,async(req,res)=>{

  const {newtitle,id} = req.body;
  await posts.update({title:newtitle},{where:{id : id}});
  res.json(newtitle);
});


router.put("/postText",validateToken,async(req,res)=>{

  const {newText,id} = req.body; 
  await posts.update({postText:newText},{where:{id : id}});
  res.json(newText);
});

router.delete("/:postId",validateToken,async(req,res)=>{
  const postId = req.params.postId;
  await posts.destroy({where:{
    id:postId,
  },})
  res.json("DELETED SUCCESSFULLY");
})

module.exports = router;