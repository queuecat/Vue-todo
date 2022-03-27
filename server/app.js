// 引入express框架
const express = require('express')
// 路径处理模块
const path = require('path')

// 导入bodyParser模块
const bodyParser = require('body-parser')
// 创建web服务器
const app = express()
// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')))
// 处理post请求参数
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: false}));

// 数据库连接
require('./model/connet')

// 导入todo路由案例
const todoRouter = require('./route/todo')
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'get,post')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
  )
  // res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Methods', 'get');
  next()
})
// 当客户端的请求路径以/todo开头时
app.use('/todo', todoRouter)

// 监听端口
app.listen(3000)
// 控制台提示输出
console.log('服务器启动成功')
