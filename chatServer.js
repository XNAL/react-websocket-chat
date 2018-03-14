const app = require('http').createServer();
const io = require('socket.io')(3333);
console.log('This server is listening port: 3333');

let socketMaps = {};
io.on('connection', function (socket) {
    console.log('connect', socket.id);

    // 监听加入聊天
    socket.on('joinChat', function (userName) {
      let user = { 
        userName: userName
      };
      socketMaps[socket.id] = user;
      // 通知其他人有人加入聊天
      socket.broadcast.emit('joinChatRemind', userName);
    });

    // 监听发送消息
    socket.on('sendMessage', function (message) {
      let user = socketMaps[socket.id];
      // 通知客户端接受消息
      socket.broadcast.emit('acceptMessage', {
        userName: user.userName,
        message: message
      });
    });

    socket.on('disconnect', function () {
      console.log('disconnect');
      let user = socketMaps[socket.id];
      delete socketMaps[socket.id];
      // 通知客户端有人离开
      socket.broadcast.emit('leaveChatRemind', user.userName);
    });
});