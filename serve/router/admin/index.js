const express = require('express')
const router = express.Router()
const linkDB = require('../../db/link')
const articleDB = require('../../db/article')
const multer = require('multer')   //node的包，用于上传文件
const path =  require('path')
const fs = require('fs')   //文件操作

//md文件上传的准备
const upload = multer({
    storage: multer.diskStorage({
        //存储的位置   diskStorage 存硬盘里(而不是内存)
        destination(req,file,cb) {  // cb为回调函数
            // console.log (file);

            //存储图片文件
            cb(null,path.join(__dirname,'../../public/md'))   

        },
        //给上传过来的文件重命名
        filename(req,file,cb) {
            // console.log(file);
            let fileName = Date.now().toString(16)+parseInt(Math.random()*10000)+'.md';
            //给文件命名
            req.fileName = fileName;
            cb(null,fileName)

        }
    })
}).array("files")


//鉴权
router.use((req, res, next) => {
    if (!req.session.userInfo) {
        return res.send({
            code: 7,
            msg: '未登录'
        })
    }
    if (!req.session.userInfo.admin) {
        return res.send({
            code: 8,
            msg: '用户不是管理员'
        })
    }
    next()
})
//添加友链
router.post('/addLink', async (req, res) => {
    let { name, home, logo, des } = req.body;
    console.log(name, home, logo, des);

    //验证数据
    if (!name || !home || !logo || !des) {
        return res.send({
            code: 1,
            msg: '数据格式不正确'
        })
    }

    //先查找有没有相同域名
    let doc = await linkDB.findOne({ home })

    //已存在，则更新
    if (doc) {
        await linkDB.updateOne({ home }, req.body)
        return res.send({
            code: 0,
            msg: '更新完成'
        })
    }

    //不存在，则添加
    await linkDB.create(req.body)

    res.send({
        code: 0,
        msg: '添加完成'
    })

})

//删除友链
router.delete('/linkDelete', async (req, res) => {
    let { _id } = req.body;
    console.log(_id);

    await linkDB.findByIdAndDelete(_id)

    res.send({
        code: 0,
        msg: '删除成功'
    })
})

//上传md文件
router.post('/upload', (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            // 报错.
            return res.send({
                code: 1,
                msg: 'A Multer error occurred when uploading'
            })
        } else if (err) {
            // 报错
            return res.send({
                code: 2,
                msg: 'A Multer error occurred when uploading'
            })
        }

        // console.log(req.fileName);
        // console.log(req.files);
        res.send({
            code:0,
            msg:'md上传成功',
            data:req.fileName
        })

       
    })


})

//文章发表
router.post('/articleAdd',async (req,res) => {
    let {title,md,des} = req.body;
    // console.log(title,md,des);

    if(!title || !md){
        return res.send({
            code:1,
            msg:'数据格式错误',
            
        })
    }
    
    //创建数据，存进数据库
    await articleDB.create({
        title,
        md:'/md/'+md,
        des,
        author:req.session.userInfo._id
    })
    res.send({
        code:0,
        msg:'文章发表成功'
    })


})

//删除文章
router.delete('/articleDelete', async (req, res) => {
    let { _id,md} = req.body;
    // console.log(_id,md);

    await articleDB.findByIdAndDelete(_id)

    //删除md文件
    try {
        fs.unlinkSync(path.join(__dirname,'../../public'+md),()=>{})
        
    } catch (e) {
        console.log(e);
        return res.send({
            code: 1,
            msg: '删除失败'
        })
    }

    res.send({
        code: 0,
        msg: '删除成功'
    })
})

module.exports = router;