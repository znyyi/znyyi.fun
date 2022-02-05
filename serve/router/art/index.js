const express = require('express')
const router = express.Router()
const articleDB = require('../../db/article')


//获取文章信息列表
router.get('/all',async (req,res) => {
    let data = await articleDB.find({},{},{sort:{pv:-1}})
        .populate('author',{pwd:0})

    res.send({
        code:0,
        msg:'查询文章完成',
        data
    })
})

//获取文章地址，给前端显示文章内容,并添加pv
router.post('/address',async (req,res) => {
    // console.log(req.body);
    let {_id} = req.body
    //返回前端md文件地址
    let doc = await articleDB.findOne({_id})
    if(!doc){
        return res.send({
            code:1,
            msg:'文章id错误',
        })
    }

    await articleDB.updateOne({_id},{$inc:{pv:1}})  //pv自增1

    res.send({
        code:0,
        msg:'获取到md文件地址',
        data:doc.md
    })

})

//返回三条热门文章
router.get('/hot',async (req,res) => {
    let data = await articleDB
        .find({},{},{limit:3,sort:{pv:-1}})
        .populate('author',{pwd:0})

    if(data.length < 3) {
        return res.send({
            code:0,
            msg:'文章不足三条'
        })
    }

    res.send({
        code:0,
        msg:'查询完成',
        data
    })

})


module.exports = router