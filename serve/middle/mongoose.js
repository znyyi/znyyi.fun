const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/blog')
    .then(() => {
        console.log('数据库连接成功！');
    },(e) => {
        console.log('数据库连接失败！',e);
    })