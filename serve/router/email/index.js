const express = require('express')
const router = express.Router()
const emailDB = require('../../db/email')

//用户仿邮件发送
router.post('/',async (req,res) => {
    let {name,email,message} = req.body;
    // console.log(name,email,message);

    if(!name.trim() || !email.trim() || !message.trim()) {
        return res.send({
            code:1,
            msg:'数据不完整'
        })
    }

    //信息存进数据库
    await emailDB.create({
        name,email,message
    })

    res.send({
        code:0,
        msg:'发送成功'
    })
})

router.post('/get',async (req,res) => {
    let data = await emailDB.find({},{},{sort:{date:-1}})

    res.send({
        code:0,
        data
    })
})
//删除邮件
router.delete('/emailDelete',async (req,res) => {
    let {id} = req.body;
    // console.log(id);

    await emailDB.findByIdAndDelete(id)

    res.send({
        code: 0,
        msg: '删除成功'
    })
    
})
module.exports = router