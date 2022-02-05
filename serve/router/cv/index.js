const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/',(req,res) => {
    // res.send(path.join(__dirname,'../../public/cv/简历.pdf'))
    res.download(path.join(__dirname,'../../public/cv/cv.pdf'))
})


module.exports = router