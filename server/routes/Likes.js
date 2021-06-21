const express = require("express");
const router = express.Router();
const {Likes} = require('../models');
const {validateToken} = require("../middlewares/AuthMiddleware")




router.post("/",validateToken,async(req,res)=>{
    const {postId} = req.body;
    const UserId = req.user.id;

    const found = await Likes.findOne({where:{postId : postId,UserId:UserId},});
    if(!found){
        await Likes.create({postId:postId,UserId:UserId});
        res.json({liked:true});
    }
    else
    {
        Likes.destroy({where:{postId:postId,UserId:UserId},});
        res.json({liked:false});
    }
    
})

module.exports = router;