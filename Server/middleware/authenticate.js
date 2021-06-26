const jwt=require('jsonwebtoken');
const User=require("../model/userSchema");

function extractToken (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
 }
const Authenticate=async (req,res,next)=>{
    try{
        //const token=req.cookies.jwt;
        const token=extractToken(req);
        const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
        const rootUser=await User.findOne({_id:verifyToken._id,"tokens.token":token});
        if(!rootUser){
            throw new Error('User Not Found')
        }
        req.token=token;
        req.rootUser=rootUser;
        req.userId=rootUser._id;
        next();
    }catch(err) {
        res.status(401).send('Unauthorized token provided');
        console.log(err);
    }
}
module.exports=Authenticate;