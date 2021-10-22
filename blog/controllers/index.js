//Kết nối với các file admin.js blog.js
var express=require('express')
var router=express.Router()

router.use('/admin',require(__dirname+'/admin'))
module.exports = router;

