const express = require('express')
const app = express()

// 访问静态文件，中间件，
app.use(express.static(__dirname+'/static'))
app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('*', function (req, res) {
    // 发松文件，参数是路径
    res.sendFile(__dirname+'/view/chat.html')
  })
app.listen(3000)