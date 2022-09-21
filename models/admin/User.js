const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    openId: {
        type: String,
        minlength: 6,
        maxlength: 30
    },

    phone: {
        type: String,
        require: true,
        length: 11,
        unique: true
    },
    nickName: {
        type: String,
        minlength: 6,
        maxlength: 30
    },

    avatar:{
        type: String,
    },

    password: {
        type: String,
        minlength: 6,
        maxlength: 30,
        select: false     
    },
    session_key:{
        type: String,
        select: false   
    }

})

// 创建model
const User = mongoose.model("user",userSchema)

module.exports = {
    User
}