const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
exports.connectMongoose = ()=>{
    mongoose.connect("mongodb://localhost:27017/chatBoxDB").then((e)=>{
        console.log("Connected to mongodb");
    }).catch((err)=>{
        console.log(err)
    })
}

const userSchema = new mongoose.Schema({
    name : String,
    username :{
        type : String,
        required : true,
        unique: true
    },
    password : String

})

exports.User = mongoose.model("User", userSchema)

