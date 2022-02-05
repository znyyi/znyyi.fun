const express = require('express')

const router = express.Router()
const userDB = require('../../db/user')
const multer = require('multer')   //node的包，用于上传文件
const path =  require('path')
const fs = require('fs')   //文件操作

//头像上传的准备
const upload = multer({
    storage: multer.diskStorage({
        //存储的位置   diskStorage 存硬盘里(而不是内存)
        destination(req,file,cb) {  // cb为回调函数
            // console.log (file);
            // console.log(path.join(__dirname,'../../public/img/photo'));

            //存储图片文件
            cb(null,path.join(__dirname,'../../public/img/photo'))   

        },
        //给上传过来的文件重命名
        filename(req,file,cb) {
            // console.log(file);
            let ext = '.'+file.mimetype.split('/')[1]   //后缀
            let filename = req.session.userInfo._id+Date.now()+ext;  //用户id+时间戳+后缀
            
            //给文件命名
            cb(null,filename)   
            req.session.userInfo.photo = '/img/photo/'+filename;   //修改session中的photo
        }
    })
}).single("file0")

//鉴权
router.use((req,res,next)=>{
    // console.log(req.session.userInfo);
    if(!req.session.userInfo){
        return res.send({
            code:4,
            msg:'用户未登陆'
    
        })
    }
    next()
    
})


//用户名修改
router.post('/name',async (req,res)=>{
    let {user} = req.body;

    //检测用户名是否符合规范
    let userReg = /^[^\s]{2,8}$/;

    if(!userReg.test(user)){
        //说明此时数据不符合要求应该返回前端
        return res.send({
            code: 1,
            msg: '数据格式错误'
        })
    }

    //检测是否存在同名用户
    let doc = await userDB.findOne({user})
    if(doc) {
        return res.send({
            code:6,
            msg:'用户名已存在'
        })
    }

    //不存在同名用户
    await userDB.updateOne({user:req.session.userInfo.user},{user})

    req.session.userInfo.user = user;
    // console.log(req.session.userInfo);

    res.send({
        code:0,
        msg:'修改成功'
    })

})

//用户密码修改
router.post('/pwd',async (req,res) => {
    let {oldPwd,pwd} = req.body;
    // console.log(oldPwd,pwd);

    //检验数据格式是否正确
    let pwdReg = /^[\w,.?;'"<>/|\\:!@##$%^&*()-=+]{6,16}$/;

    if(!pwdReg.test(oldPwd) || !pwdReg.test(pwd)){
        //说明此时数据不符合要求应该返回前端
        return res.send({
            code: 1,
            msg: '数据格式错误'
        })
    }

    //查询密码
    let user = req.session.userInfo.user;
    let doc = await userDB.findOne({user})
    // console.log(doc);

    //原密码输入错误
    if(oldPwd != doc.pwd){
        return res.send({
            code:2,
            msg: '原密码错误'
        })
    }

    //修改密码
    await userDB.updateOne({user},{pwd})
    //清除session
    req.session.destroy()
    return res.send({
        code:0,
        msg: '密码修改成功'
    })
})

//用户头像上传
router.post('/avatar',(req,res) => {
    upload(req, res, async (err) =>{
        if (err instanceof multer.MulterError) {
          // 报错.
          return res.send({
              code:1,
              msg:'A Multer error occurred when uploading'
          })
        } else if (err) {
          // 报错
          return res.send({
            code:2,
            msg:'A Multer error occurred when uploading'
        })
        }

        //删除原来的photo文件
        let doc =  await userDB.findOne({user:req.session.userInfo.user})
        let oldPhoto = doc.photo;

        if(!/\/img\/photo\/default\.jpg/.test(oldPhoto)){  //不能删除默认图片 default.jpg
            //如果原来的photo不是 default.jpg，则进行下面的操作

            // console.log(path.join(__dirname+'../../../public'+oldPhoto));
            //删除原来的图片文件
            fs.unlink(path.join(__dirname+'../../../public'+oldPhoto),()=>{})
            
        }

        //修改数据库中photo值
        await userDB.updateOne({user:req.session.userInfo.user},{photo:req.session.userInfo.photo})
        
        res.send({
            code:0,
            msg:'头像上传完成',
            data:req.session.userInfo.photo
        })  //把修改的头像url返回给前端
        // Everything went fine.
      })

})

module.exports = router;