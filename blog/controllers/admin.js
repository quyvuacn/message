const { compile, render } = require('ejs')
var express=require('express')
var session = require('express-session')
var hash_password=require('../helper/hashpassword').hash_password
var compare_passwword=require('../helper/hashpassword').compare_passwword
var addUser = require('../models/User').addUser
var checkUser = require('../models/User').checkUser

var router=express.Router()



router.get('/',function(req,res){
   res.render('index',{data:{mess:'ok'}})
})
router.get('/signup',function(req,res){
    res.render('signup',{data:{}})
})
router.get('/login',function(req,res){
    res.render('login',{data:{}})
})

router.post('/signup',function(req,res){
    var user = req.body
    var forward =true;
    if(!user.gmail || !user.password){
        res.render('signup',{data:{error:'Oh. Bạn phải điền đầy đủ tên tài khoản và mật khẩu chứ'}})
        forward=false;
    } else if(user.password != user.repassword){
        res.render('signup',{data:{error:'Mật khẩu nhập lại không đúng'}})
        forward=false;
    } else if(user.gmail.trim().length<8){
        res.render('signup',{data:{error:'Tên tài khoản phải có từ 8 kí tự'}})
        forward=false;
    }else if(user.password.trim().length<6){
        res.render('signup',{data:{error:'Mật khẩu phải có từ 6 kí tự'}})
        forward=false;
    }

    if(forward){
         // Ma hoa mat khau 
         var password = hash_password(user.password)
         user={
             email:user.gmail,
             password:password,
         }

         // Add user
        if(!addUser(user)){
            res.render('signup',{data:{error:'Email đã tồn tại hoặc lỗi đăng kí'}})
        }
        else{
            console.log("1 record inserted");
            res.redirect('/admin/login') 
        }
    }

})


router.post('/login',function(req,res){
    var infor = req.body
    if(infor.gmail.trim().length==0 || infor.password.trim().length==0){
        res.render('login',{data:{error:'Tên đăng nhập hoặc mật khẩu không được bỏ trống'}})
    } else{
        data=checkUser(infor.gmail)
        if(data){
            data.then(function(users){
                var user = users[0]
                var check = compare_passwword(infor.password,user.password)
                if(!check){
                    res.render('login',{data:{error:'Tên đăng nhập hoặc mật khẩu sai'}})  
                } else{
                    req.session.user = user
                    res.redirect('/admin/')               
                }
            })
        }
        else{
            res.render('login',{data:{error:'Lỗi đăng nhập'}})  
        }
        
        
    }
})




module.exports = router;
