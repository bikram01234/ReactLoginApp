const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const app=express();
require("../db/conn");
const cors = require('cors');
//const cookieParser = require('cookie-parser');
const User=require("../model/userSchema");
const authenticate=require("../middleware/authenticate");
router.use(cors({ origin: 'http://localhost:3000', credentials: true }));  
//router.use(cookieParser());
router.get("/",(req,res)=>{
    res.send("Welcome to home page router js");
});
//using promises
/*
router.post("/register",(req,res)=>{

    const {name,email,phone,work,password,cpassword}=req.body;
    if(!name || !email || !phone || !work || !password || !cpassword ) {
        return res.status(422).json({eroor:"please fill all the details"});
    }
    User.findOne({email:email})
    .then((userExist)=>{
        if(userExist) {
            return res.status(422).json({eroor:"email already exists"});
        }
        const user=new User({name,email,phone,work,password,cpassword});
        user.save().then(()=>{
            res.status(201).json({message:"user registered succesfully"});
        }).catch(err=>{res.status(422).json({error:"failed to register"})});
           
    }).catch(err=>{console.log(err);});
});
*/
//using async-await
router.post("/register", async (req,res)=>{

    const {name,email,phone,work,password,cpassword}=req.body;
    if(!name || !email || !phone || !work || !password || !cpassword ) {
        return res.status(422).json({eroor:"please fill all the details"});
    }
     try{
        const userExist= await User.findOne({email:email});
        if(userExist) {
            return res.status(422).json({eroor:"email already exists"});
        }else if(password!=cpassword) {
            return res.status(422).json({eroor:"password are not matching"});
        }
        else {
            const user=new User({name,email,phone,work,password,cpassword});


            await user.save();
             
                  res.status(201).json({message:"user registered succesfully"});
        } 
        

     }catch(err) {
        console.log(err);
     }
});

//Login Route
router.post("/signin",async (req,res)=>{
    
      try{
        
             const {email,password}=req.body;
             if(!email || !password ) {
                return res.status(400).json({eroor:"please fill all the details"});
            }
            
            const userLogin=await User.findOne({email:email});
           
            if(userLogin) {
                const isMatch=await bcrypt.compare(password,userLogin.password);
                const token=await userLogin.generateAuthToken();
                console.log(token);
               
              //  res.cookie("Bikram","Jha");
           //   res.cookie("jwtoken",token,{
               // expires: new Date(Date.now() + 30000),
            
              //  httpOnly: true
               // });
                if(!isMatch) {
                    return res.status(400).json({eroor:"Invalid Credential "});
                }
                else {
                 
                   return res.status(200).json({userLogin:token});
                }
            }
            else {
               return res.status(400).json({eroor:"Invalid Credential "});
            }
            

      }catch(err) {
         console.log(err);
      }
});

router.get("/about", authenticate, async (req, res) => {
    res.send(req.rootUser)
})
router.get("/getdata", authenticate, async (req, res) => {
    res.send(req.rootUser)
})

router.post("/contact",authenticate,async (req,res)=>{
    try{

        const {name,email,message}=req.body;
        if(!name || !email || !message) {
            console.log("error in contact form");
            return res.json({error:"please fill data properly"});
        }
        const userContact=await User.findOne({_id:req.userId});
        if(userContact){
            const userMessage=await userContact.addMessage(name,email,message);
            await userContact.save();
            
            return res.status(200).json({userMessage});
        }


    }catch(error){
        console.log(error);
    }
});

router.get('/logout',(req,res)=>{
    console.log('Hello My Logout Page');
    res.clearCookie('jwt',{path:'/'});
    res.status(200).send('User LogOut');
})

module.exports=router;