const express = require('express')
const router = express.Router()
const msgDB = require('../../db/msg')

//留言发表
router.post('/report', async (req, res) => {
    //验证用户是否登录
    if (!req.session.userInfo) {
        return res.send({
            code: 1,
            msg: '用户未登录'
        })
    }

    let { msg } = req.body;
    //验证数据
    if (!msg.trim()) {
        return res.send({
            code: 2,
            msg: '留言内容为空'
        })
    }

    //存储到数据库
    await msgDB.create({
        msg,
        user: req.session.userInfo._id
    })

    //返回前端
    res.send({
        code: 0,
        msg: '留言成功'
    })


})

//留言获取
router.get('/get', async (req, res) => {
    //获取数据库中留言数据
    let data = await msgDB.find({}, {}, { sort: { date: -1 } })
        .populate('user', { pwd: 0 })
        .populate('children.user', { pwd: 0 })
        .populate('children.replyUser', { pwd: 0 })



    // console.log(data);
    res.send({
        code: 0,
        msg: '留言请求成功',
        data
    })
})

//子留言提交
router.post('/reply', async (req, res) => {
    let { msg, _id, replyUserId,replyUserMsg } = req.body;

    // console.log(msg,_id,replyUserId,req.session.userInfo._id);
    //msg：子回复留言   _id：留言板中某条留言的id   replyUserId：留言板中某条留言的留言者用户id


    console.log(replyUserMsg);
    //验证数据
    if (!msg || !_id || !replyUserId || !replyUserMsg) {
        return res.send({
            code: 1,
            msg: '数据格式不正确'
        })
    }

    //存储
    try {
        await msgDB.findByIdAndUpdate(_id, {
            $push: {
                children: {
                    msg,
                    user: req.session.userInfo._id,
                    replyUser: replyUserId,
                    replyUserMsg
                }
            }
        })
    } catch (error) {
        res.send({
            code: 2,
            msg: error
        })
    }

    res.send({
        code: 0,
        msg: '回复成功'
    })

})

//点赞
router.post('/like', async (req, res) => {
    let { item, childItem } = req.body;

    let replyUserId = req.session.userInfo._id;

    try {
        //子留言的点赞
        if (childItem) {
            // console.log(doc.children.id(childItem._id));

            let doc = (await msgDB.findById(item._id)).children.id(childItem._id) //找到该条子留言
            
            let likes = doc.likes;
            let index = likes.indexOf(replyUserId)

            if(index !== -1){
                likes.splice(index,1)
            }else {
                likes.push(replyUserId)

            }

            
            await msgDB.updateOne({ _id: item._id, 'children._id': childItem._id }, {
                $set: { 'children.$.likes': likes }
            })

            // await msgDB.updateOne({ _id: item._id, 'children._id': childItem._id }, {
            //     $push: { 'children.$.likes': replyUserId }
            // })
            if(index !== -1){
                return res.send({
                    code: 1,
                    msg: '取消点赞'
                })
            }else{
                return res.send({
                    code: 0,
                    msg: '点赞成功'
                })
            }

            
        }

        //父留言的点赞
        let doc = await msgDB.findById(item._id)  //找到该条父留言
        let likes = doc.likes;
        let index = likes.indexOf(replyUserId)

        // console.log(replyUserId);
        // console.log(likes);

        if(index !== -1){
            likes.splice(index,1)
        }else {
            likes.push(replyUserId)
        }

        //更新数据库
        await msgDB.updateOne({ _id: item._id}, {
            $set: { 'likes': likes }
        })

        if(index !== -1){
            return res.send({
                code: 1,
                msg: '取消点赞'
            })
        }else{
            return res.send({
                code: 0,
                msg: '点赞成功'
            })
        }



    } catch (error) {
        res.send({
            code: 4,
            msg: error
        })
        console.log(error);
    }

})

module.exports = router;