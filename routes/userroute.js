const express=require('express');
const {UserModel}=require("../models/usermodel");

require('dotenv').config();

const userrouter=express.Router();

const jwt=require('jsonwebtoken');

const bcrypt=require('bcrypt');


userrouter.post("/register",async(req,res)=>{
    const {name,email,password,address:{street,city,state,country,zip}}=req.body;
    // console.log(req.body);
    try {
        bcrypt.hash(password,5,async(err,secure_password)=>{
          if(err){
            console.log({"msg":"err"})
          }else{
            const user_data=new UserModel({name,email,password:secure_password,address:{street,city,state,country,zip}});
            console.log(user_data);
            await user_data.save();
            res.json({"msg":"User Successfully Registered"})
          }
        });
    } catch (error) {
        console.log(error);
        res.json({"msg":"Error while registering the user"});
    }
})

userrouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        let find_email=await UserModel.find({email:email});
        // console.log(find_email)
        const hashed_password=find_email[0].password;
        // console.log(hashed_password)
        if(find_email.length>0){
            bcrypt.compare(password, hashed_password,(err, result)=> {
               
                if(result){
                    let token= jwt.sign({ UserId:find_email[0]._id }, 'process.env.key');
                    res.json({"msg":"Successfully Logged In","token":token})
                } else{
                    console.log({"msg":"Password Mismatch"});
                    res.json({"msg":"wrong credentials"})
                }
            });
        }else{
            res.json({"msg":"wrong credentials"})
        }
       
    } catch (error) {
        console.log(error);
        res.json({"msg":"Error while logging the user"});
    }
})

userrouter.patch("/user/:id/reset",async(req,res)=>{
    let id=req.params.id
    const {email,password}=req.body;
    const payload=req.body
    let password1=req.body.password1;
    try {
        let find_email=await UserModel.find({email:email});
        const hashed_password=find_email[0].password;
        bcrypt.compare(password, hashed_password,async (err, result)=> {
           if(result){
               console.log(find_email);
            //    find_email[0].password=password1
               let store=find_email[0];
               store.password=password1;
              
            
           
            await UserModel.findByIdAndUpdate({"_id":id},payload)
            // await store.save();
            console.log(find_email);
            res.json({"msg":"password updated successfully"})
            } else{
                console.log({"msg":"Password Mismatch"})
            }
        });
    } catch (error) {
        console.log(error);
    }
})
module.exports={
    userrouter
}


// {
//     "name":"nikhil",
//     "email":"nikhil@gmail.com",
//     "password":"nikhil",
//     "address":{
//       "street":"indian",
//       "city":"newdelhi",
//       "state":"newdelhi",
//       "country":"india",
//       "zip":"1111"
//     }
    
//   }


// {
//     "email":"nikhil@gmail.com",
//     "password":"nikhil"
//   }

// user/644cbd40ef54c45ba7148d5e/reset