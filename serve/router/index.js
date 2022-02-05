const express = require('express')

const router = express.Router()

//根路由
router.get('/',(req,res)=>{
    //子路由中的 / ，代表自身的父路由
    res.send('根路由')
    console.log(req.session);
})


//注册路由
router.use('/reg',require('./reg/index'))

//登录路由
router.use('/login',require('./login/index'))

//用户信息修改接口
router.use('/user',require('./user/index'))

//留言接口
router.use('/msg',require('./msg/index'))

//admin相关接口
router.use('/admin',require('./admin/index'))

//获取友链的接口
router.use('/linkServer',require('./linkServer/index'))

//文章相关接口
router.use('/art',require('./art/index'))

//访客接口
router.use('/visitor',require('./visitor/index'))

//
//邮件接口
router.use('/email',require('./email/index'))

//下载简历接口
router.use('/cv',require('./cv/index'))

module.exports = router;