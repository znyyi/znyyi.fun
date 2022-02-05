const session = require('express-session')

const MongoStore = require('connect-mongo')

//配置session
module.exports = session({
    secret:'keyboard cat',   //秘钥，根据秘钥对cookie进行加密
    rolling: true,   //一般为true
    resave:false,      // 一般为false，更新时是否强制保存
    saveUninitialized:true,   //建议为true,初始化保存
    cookie:{
        maxAge:7*24*60*60*1000,   //设置cookie保存最久时间 7天
        // httpOnly:true
    },
    //将登录信息存储到数据库，而不是服务器端内存
    store: MongoStore.create({
        mongoUrl: "mongodb://localhost:27017/blog" // blog 为项目对应的数据库名
    })
})