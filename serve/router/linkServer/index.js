const express = require('express')
const router = express.Router()
const linkDB = require('../../db/link')

router.get('/', async (req, res) => {
    try {
        let data = await linkDB.find()
        res.send({
            code: 0,
            msg: '获取友链成功',
            data
        })
    } catch (error) {
        console.log(error);
        res.send({
            code: 1,
            msg: '获取友链失败'
        })

    }
})

module.exports = router;