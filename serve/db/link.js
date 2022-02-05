const mongoose = require('mongoose')

const Schema = mongoose.Schema

let userSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    home: {
        type: String,
        required: true
    },
    logo:{
        type:String,
        required: true
    },
    des: {
        type: String,
        required: true

    }
})

module.exports = mongoose.model('link',userSchema)