// 多个终端，通信
var WebSocketServer = require('websocket').server

// 引入http模块
var http = require('http');
// 创建服务器
var server = http.createServer()
// 监听
server.listen(3000, function () {
    console.log('服务器搭建成功');
});
// 储存终端
var clients=[]
// 创建对象
var wsServer=new WebSocketServer({httpServer:server});

// 监听连接请求
wsServer.on('request', function (websocketRequest) {
    // 当前连接回话
    var connection=websocketRequest.accept(null,'accepted-origin')
    clients.push(connection)
    //     setInterval(()=>{
    //     connection.sendUTF('服务端发送了一个信息');
    // },3000)
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            // 给每一个连接都发送数据
            clients.forEach(item=>{
                item.sendUTF(message.utf8Data)
            })
        } else if (message.type === 'binary') {
            clients.forEach(item=>{
                item.sendUTF(message.binary)
            })
        }
    });
    connection.on('close', function (reasonCode, description) {
        console.log('断开l连接')
        var index=clients.indexOf(connection)
        clients.splice(index,1)
    });
})