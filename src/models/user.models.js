const mongoose  = require("mongoose");
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({

    fullName:{
        type:String,
        required : true
    },
    userName:{
        type:String,
        required : true,
        unique:true
    },
    email:{
        type:String,
        required : true,
        unique:true
    },
password:{
        type:String,
        required : true
    },
    mobile:{
        type:String,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
      },
    ],
    rePost: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
      },
    ],
    refreshToken: {
      type: String,
    },
},

  {
    timestamps: true,
  },
);

userSchema.pre("save", function(){
       return this.password = bcrypt.hashSync(this.password,10)
    })

userSchema.methods.comparePass = function (password) {
   return bcrypt.compareSync(password, this.password);
};

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;