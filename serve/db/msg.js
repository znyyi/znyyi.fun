const mongoose = require('mongoose')
const Schema = mongoose.Schema

let msgSchema = new Schema({
    //留言内容
    msg: {
        type: String,
        require: true
    },
    //时间
    date: {   //时间戳
        type:Number,
        default: Date.now   //不能写Date.now()  
    },
    // 用户
    user: {
        type: Schema.Types.ObjectId,   //注意不能写成 type: ObjectId  
        ref:'user',    //表关联
        require: true
    },
    //点赞
    likes: [Schema.Types.ObjectId],    //likes字段 是一个数组，数组里的元素为Schema.Types.ObjectId类型     //ObjectId  类型 必须写成 Schema.Types.ObjectId 即 mongoose.Schema.Types.ObjectId
    //子留言
    children: [{   //children是一个数组，里面的元素的类型是对象
        msg: {type: String,required: true},
        date: {type: Number,default :Date.now},
        //子用户
        user: {type: Schema.Types.ObjectId,ref:'user',required: true},
        likes: [Schema.Types.ObjectId],   //默认值为一个空数组
        
        //回复的父用户(对象)是谁
        replyUser:{type: Schema.Types.ObjectId,ref:'user',required: true},
        //回复的父用户的留言
        replyUserMsg: {type:String,required:true}
    }]
})
module.exports = mongoose.model('msg',msgSchema)