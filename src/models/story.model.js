const mongoose = require("mongoose")

const storySchema = new mongoose.Schema({

    user_id : {
        type:mongoose.Schema.Types.ObjectId,
        ref: user,
        required:true,
    },
    image:{
        type:String,
        required:true
    },
})

const storyModel = mongoose.model("story", storySchema)

module.exports = storyModel;
