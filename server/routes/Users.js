const express = require("express");
const router = express.Router();
const {Users} = require('../models');
//app.use(express.json());
const bcrpyt = require("bcrypt");
const {sign} = require('jsonwebtoken')
const {validateToken} = require("../middlewares/AuthMiddleware")
router.post("/",async(req,res)=>{
    const {username , password} = req.body;
    bcrpyt.hash(password,10).then((hash)=>{
        Users.create({
            username :username,
            password : hash,
        })
        res.json("Success"); 
    });
});

router.post("/login",async(req,res)=>{
    const {username , password} = req.body;
    const user = await Users.findOne({where :{username:username}});
    if(!user) res.json({error:"User doesn't exist"});

    bcrpyt.compare(password,user.password).then((match)=>{
        if(!match) res.json({error:"Wrong User"});
        const accessToken = sign({username:user.username,id:user.id},"importantsecret");
        res.json({token:accessToken,username:username,id:user.id});
        
    });

})
router.get("/auth",validateToken,(req,res) =>{ 
    res.json(req.user);
})

router.get("/basicinfo/:id",async(req,res)=>{
    const id = req.params.id;
    const basicInfo = await Users.findByPk(id,{attributes:{exclude:['password']}});
    res.json(basicInfo);
})

router.put("/changepassword",validateToken,async(req,res)=>{
    const {oldPassword,newPassword} = req.body;
    const user = await Users.findOne({where :{username:req.user.username}});
    bcrpyt.compare(oldPassword,user.password).then((match)=>{
        if(!match) res.json({error:"Wrong Old password"});
        bcrpyt.hash(newPassword,10).then((hash)=>{
            Users.update({password:hash},{where:{username:req.user.username}})
            res.json("Password changed successfully"); 
        });
        
    });
 })
module.exports = router;