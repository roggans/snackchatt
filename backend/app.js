const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3010;

io.on('connection', function(socket){
  console.log('User connented');
  // ta emot ett meddelande från en klient/socket
  socket.on('chat message', function(message){
    console.log('message: ', message);
    // skicka alla meddelanden till alla klienter/socket
    io.emit('chat message', message);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
