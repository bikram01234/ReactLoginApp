const dotenv=require("dotenv");
const mongoose=require('mongoose');
const express=require('express');
const app=express();
const cors = require('cors')
app.use((req,res, next)=>{
    res.setHeader('Access-Control-Allow-Origin',"http://localhost:3000");
    res.setHeader('Access-Control-Allow-Headers',"*");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
  app.use(cors({ origin: true }));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

dotenv.config({ path:'./config.env'} );

require('./db/conn');
app.use(express.json());
app.use(require('./router/auth'));

const PORT=process.env.PORT;


/*const middleware =(req,res,next)=>{
    console.log("this is middleware");
    next();
}
*/
/*
app.get("/",(req,res)=>{
       res.send("Welcome to home page app js");
});
*/
/*
app.get("/about",middleware,(req,res)=>{
    res.send("Welcome to about page");
});*/
/*
app.get("/contact",(req,res)=>{
    //res.cookie("bikram",'jha');
    res.send("Welcome to contact page");
});
*/

app.get("/signin",(req,res)=>{
   // res.cookie("Bikram Kumar",'jha');
    res.send("Welcome to login page");
});

app.get("/signup",(req,res)=>{
    res.send("Welcome to registration page");
});


app.listen(PORT,()=>{
    console.log(`Server is running at port no ${PORT}`);
});

