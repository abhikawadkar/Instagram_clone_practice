const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    image :[ {
        type:String,
        required:true,
    }],
    caption:{
        type:String,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    likes:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
   
},
{
    timestamps:true,
})

const postModel  = mongoose.model("post",postSchema)

module.exports = postModel;
