const express = require('express')
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
// socket服务监听建立连接
io.on('connection', (socket) => {
  // 向客户端发送消息
  socket.emit('request', /* … */ );
  // 向所有客户端发送消息
  io.emit('broadcast', /* … */ );
  // 监听用户登录事件
  socket.on('login', (res) => {
    socket.username = res
  });
  // 监听客户端发来的事件
  socket.on('send', (res) => {
    console.log(res)
    io.emit('msg', {
      user: socket.username,
      news: res
    })
  });
});
// 访问静态文件，中间件，
app.use(express.static(__dirname + '/static'))
app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('*', function (req, res) {
  // 发松文件，参数是路径
  res.sendFile(__dirname + '/view/chat.html')
})
server.listen(3000, function () {
  console.log('服务器搭建成功');
});