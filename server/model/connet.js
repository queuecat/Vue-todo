// 此文件用于链接数据库

// 引入mongooes模块链接数据库
const mongoose = require('mongoose')
// 链接数据库
mongoose
  .connect('mongodb://user:123456@localhost:27017/todo', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('数据库链接成功')
  })
  .catch(err => {
    console.log('数据库连接失败:' + err)
  })
