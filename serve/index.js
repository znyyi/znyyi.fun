// index.js 入口文件
const express = require('express')
const path = require('path')
const app = express()

//解决跨域
app.use(require('./middle/cors')) 
//session中间件
app.use(require('./middle/session'))

//配置解析 post请求数据  express内置中间件
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//静态资源库
app.use(express.static('./public'))

app.listen('4000',()=>{
    console.log('启动4000端口');
})

//启动数据库
require('./middle/mongoose')

//根路由
app.use('/',require('./router/index'))

//解决history模式，刷新或者手动输入地址无法访问到页面的问题
app.get('*',(req,res) =>{
    res.sendFile(path.join(__dirname,"./public/index.html"))
})

