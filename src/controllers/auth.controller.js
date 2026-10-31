const userModel = require("../models/user.models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const generateToken = require("../utils/token")

const userRegister = async (req, res) => {

    const { fullName, userName, password, email, mobile } = req.body

    if (!fullName || !userName || !password || !email) return res.status(400).json({
        message: "All fields are required"
    })

    const isExists = await userModel.findOne({ email })

    if (isExists) return res.status(409).json({
        message: "User already exists"
    })


    const user = await userModel.create({
        fullName,
        userName,
        email,
        password,
        mobile,
    })

    
    const accessToken = generateToken( user._id,process.env.ACCESS_SECRET,"30m")

    const refreshToken = generateToken( user._id,process.env.REFRESH_SECRET,"1h")

    user.refreshToken = refreshToken;
    await user.save()
    

    res.cookie("AccessToken", accessToken,{
        httpOnly: true,
        maxAge: 30 * 60 * 1000
    })

    res.cookie("RefreshToken", refreshToken,{
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    })





    res.status(201).json({
        message: "User created successfully",
        user: {
            userName: user.userName,
            fullName: user.fullName,
            email: user.email,
            mobile: user.mobile
        }
    })


}
const userLogin = async (req, res) => {

    const { password, email, } = req.body;

   try {
    
     if (!password || !email) {
        return req.status(400).json({
            message: "All fields are required"
        })
    }

    const isExists = await userModel.findOne({ email })

    if (!isExists) {
        return res.status(404).json({ message: "User not found" })
    }

    const checkPass = bcrypt.compareSync(password, isExists.password)

    console.log(isExists.password)

    if(!checkPass){return res.status(401).json({ message:"Invalid credentials" })}

    const accessToken = generateToken( isExists._id,process.env.ACCESS_SECRET,"30m")

    const refreshToken = generateToken( isExists._id,process.env.REFRESH_SECRET,"1h")

    user.refreshToken = refreshToken;
    await user.save()
    

    res.cookie("AccessToken", accessToken,{
        httpOnly: true,
        maxAge: 30 * 60 * 1000
    })

    res.cookie("RefreshToken", refreshToken,{
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    })




    res.status(200).json({
        message:"User logged-in "
    })

   } catch (err) {
     console.log("error",err)
     res.status(500).json({
        message:"Internal server error "
     })
   }


}

module.exports = {userRegister , userLogin}
