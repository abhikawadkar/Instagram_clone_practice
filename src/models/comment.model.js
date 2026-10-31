const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:user,
        required:true,
    },
    text:{
        type:String,
    },
    post_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post",
        required:true
    }
},{
    timestamps:true,
})

const commentModel = mongoose.model("comment", commentSchema)

module.exports = commentModel;