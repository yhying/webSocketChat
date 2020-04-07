const express = require('express')
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
var count = 0;
// socket服务监听建立连接
io.on('connection', (socket) => {
  // 向客户端发送消息
  socket.emit('request', /* … */ );
  // 向所有客户端发送消息
  io.emit('broadcast', /* … */ );
  // 监听用户登录事件
  socket.on('login', (res) => {
    socket.username = res
    count++
    io.emit('count', count)

  });
  // 监听客户端发来的事件
  socket.on('send', (res) => {
    // console.log(res)
    var myDate = new Date();
    myDate.getYear(); // 获取当前年份(2位)
    myDate.getFullYear(); // 获取完整的年份(4位,1970-????)
    myDate.getMonth(); // 获取当前月份(0-11,0代表1月)
    myDate.getDate(); // 获取当前日(1-31)
    myDate.getDay(); // 获取当前星期X(0-6,0代表星期天)
    myDate.getTime(); // 获取当前时间(从1970.1.1开始的毫秒数)
    myDate.getHours(); // 获取当前小时数(0-23)
    myDate.getMinutes();
    console.log(myDate.getYear())
    io.emit('msg', {
      user: socket.username,
      news: res
    })
  });
  // 监听用户退出
  socket.on('disconnect', function () {
    count--;
    io.emit('count', count)

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