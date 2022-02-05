const express = require('express')

const router = express.Router()
const userDB = require('../../db/user')

//监听 /reg 注册的post请求
router.post('/',async (req,res)=>{
    
    let {user,pwd} = req.body;

    //检测用户名是否符合规范
    let userReg = /^[^\s]{2,8}$/,
    pwdReg = /^[\w,.?;'"<>/|\\:!@##$%^&*()-=+]{6,16}$/;

    if(!userReg.test(user) || !pwdReg.test(pwd)){
        //说明此时数据不符合要求应该返回前端
        return res.send({
            code: 1,
            msg: '数据格式错误'
        })
    }


    console.log(user,pwd);



    //检测用户名是否已经存在
    let doc = await userDB.findOne({user})
    if(doc){

        console.log(doc);
        return res.send({
            code: 2,
            msg: '用户名已存在'
        }) 
    }

    //创建文档
    await userDB.create({user,pwd})

    
    res.send({
        code:0,
        msg:'注册成功'
    })
})

module.exports = router;