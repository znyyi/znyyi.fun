const mongoose = require('mongoose')

const Schema = mongoose.Schema

let userSchema = new Schema({
    user: {
        type:String,
        required:true
    },
    pwd: {
        type: String,
        required: true
    },
    photo:{
        type:String,
        default: '/img/photo/default.jpg'
    },
    //是否管理员身份
    admin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('user',userSchema)