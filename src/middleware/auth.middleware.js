
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userModel = require("../models/user.models")
const authMiddleware  = async(req,res,next)=>{

    const token = req.cookies.Token 

    try {
           if(!token){
        return res.status(403).json({
            message:"Access Unauthorised"
        })
    }

    const decoded =  jwt.verify(token,process.env.JWT_SECRET);
    
    const user = await userModel.findById(decoded.id) 

    if(!user){
        return  res.status(404).json({
            message:"User not found"
        })
    }

    req.user=user;

    next()


    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message:"Internal server error"
        })
    }


}

module.exports = authMiddleware;