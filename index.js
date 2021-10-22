var express=require('express')
var config=require('config')
var app=express()
var bodyParser = require('body-parser')
var session = require('express-session')

//Set ejs
app.set('views',__dirname+'/blog/views/admin')
app.set('view engine','ejs')

//Set body-parser

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Set express-session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

//trỏ file css cho ejs qua đường dẫn static
app.use('/static',express.static(__dirname+'/blog/views/assets'))


var controller = require(__dirname+'/blog/controllers')
app.use(controller)

var host=config.get('server.host')
var port=config.get('server.port')
app.listen(port,host,function(){
    console.log('Server is running on port',port)
})

