const mongoose = require('mongoose')

const Schema = mongoose.Schema

let emailSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    message:{
        type:String,
        required:true
    },
    date: {
        type:Number,
        default:Date.now
    }
})

module.exports = mongoose.model('email',emailSchema)