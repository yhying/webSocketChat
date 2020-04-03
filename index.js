var WebSocketServer = require('websocket').server;
var http = require('http');

// 创建服务器
var server = http.createServer(function (request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
// 监听
server.listen(3000, function () {
    console.log((new Date()) + ' Server is listening on port 3000');
});

wsServer = new WebSocketServer({
    httpServer: server,
});

function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
}

wsServer.on('request', function (request) {
    if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }
    // 当前连接
    var connection = request.accept(null, request.origin);
    // setInterval(()=>{
    //     connection.sendUTF('服务端发送信息'+new Date());
    // },1000)
    console.log((new Date()) + '建立连接');
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF(message.utf8Data);
        } else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function (reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + '断开连接');
    });
});