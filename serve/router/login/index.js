const express = require('express')
const router = express.Router()
const userDB = require('../../db/user')
const visitorDB = require('../../db/visitor')


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

    //检测用户名是否存在
    let doc = await userDB.findOne({user})

    if(!doc) {
        return res.send({
            code:3,
            msg:'用户名不存在'
        })
    }

    //检测密码对不对
    if(doc.pwd !== pwd) {
        return res.send({
            code:5,
            msg:'密码错误'
        })
    }

    // console.log(doc);

    //登录成功
    //配置session
    req.session.userInfo = {
        user:doc.user,
        photo:doc.photo,
        _id:doc._id,
        admin:doc.admin
    };

    //添加当前用户到访问表
    // let visitorDoc = await visitorDB.findOne({visitor:doc._id})
    // if(visitorDoc) {
    //     await visitorDB.updateOne({visitor:doc._id},{date:Date.now()})
    // }
    // else{
    //     await visitorDB.create({
    //         visitor:doc._id
    //     })
    // }
    visitorRecord(doc._id)


    
    
    res.send({
        code:0,
        msg:'登录成功',
        data: req.session.userInfo
    })
})

//检测是否登录接口
router.post('/check',async (req,res)=>{
    // console.log(req.session.userInfo);
    
    if(req.session.userInfo){

        //检查当前session和数据库中存储数据是否一致
        let doc = await userDB.findById(req.session.userInfo._id,{pwd:0}) 
        //重新赋值session
        req.session.userInfo = doc


        // console.log(req.session.userInfo);
        // console.log(doc);
        
        //添加当前用户到访问表
        visitorRecord(req.session.userInfo._id)

        res.send({
            code:0,
            msg:'已经登录',
            data: req.session.userInfo
        })
    }else{
        res.send({
            code:-1,
            msg:'未登录',
            data: {}
        })
    }
})


// 检查用户登录权限
router.post('/checkUser',(req,res) => {
    // console.log(req.session.userInfo);
    if(!req.session.userInfo){
        return res.send({
            code:1,
            msg:'用户未登录，请先登陆'
        })
    }else {
        return res.send({
            code:0,
            msg:'用户已登陆'
        })
    }
})

//检查管理员登录权限
router.post('/checkAdmin',(req,res) => {
    // console.log(req.session.userInfo);
    if(!req.session.userInfo){
        return res.send({
            code:1,
            msg:'用户未登录，请先登陆'
        })
    }else if(!req.session.userInfo.admin){
        return res.send({
            code:1,
            msg:'非管理员权限'
        })
    }
    res.send({
        code:0,
        msg:'管理员'
    })
})


//退出登录接口
router.post('/logout',(req,res)=>{
    req.session.destroy();  //销毁session
    res.send({code:-2,msg:'退出登录'})

})

async function visitorRecord(id) {
    let visitorDoc = await visitorDB.findOne({visitor:id})
    if(visitorDoc) {
        await visitorDB.updateOne({visitor:id},{date:Date.now()})
    }
    else{
        await visitorDB.create({
            visitor:id
        })
    }
}

module.exports = router;