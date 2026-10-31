const postModel = require("../models/post.model")
const uploadFile = require("../services/storage.service")

const postController = async(req,res)=>{

    const {caption} = req.body
    const files = req.files
    let user = req.user

    if(!files){
        return res.status(401).json({
            message:"All field are required"
        })
    }

    // const media = await uploadFile(files[0].buffer.toString('base64'))

    let uploadImgs = await Promise.all(
        files.map( async (val)=>{ 
            return await uploadFile( val.buffer, val.originalname) } )
     ) 
     console.log(uploadImgs)

    const post = await postModel.create({
        user_id:req.user._id,
        image : uploadImgs.map( (val) => val.url),
        caption,
    })

    user.posts.push(post._id)
    await user.save()

    res.status(201).json({
        message:"post created successfully",
        post:{
            image : post.image,
            caption: post.caption    
        }
    })

}


module.exports = postController