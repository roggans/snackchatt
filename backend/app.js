const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3010;
const mongoose = require('mongoose');

// Needed to be able to read req.body for post and put requests
const bodyparser = require('body-parser');
app.use(bodyparser.json());

mongoose.connect('mongodb://localhost/snackchatt', function(err,){
if(err){
  throw err;
}
console.log('mongo connected');
});
// create a schema
let UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  email: {
    type: String
    //, unique: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  chatRooms: {
    type: [String],
    default: ['general','abc123'],
    messageText: String, //ROger tillagt kommer meddewlandet i "rätt"rum nu?
  },
  avatar: Number,
  /*confirmed: {
    type: Boolean,
    default: false
  }*/
}
);

// create a model from the schema
var User = mongoose.model('User', UserSchema);

//Skapa en user
/*let Rogge = new User({username: 'Tomme', password: '1234', email: 'rogge@snabel.com',avatar:10})
console.log(Rogge.username);

//spara användaren
Rogge.save();*/

app.post('/register', async (req, res) => {
  // check that the username isn't taken already
  let usersWithSameUserName = await User.find({ username: req.body.username });
  if (usersWithSameUserName.length > 0) {
    res.json({ error: 'Username taken' });
  }
  // we expect req.body (sent from frontend) to be an object
  // following the User schema (chatRooms doesn't have to be filled in)
  let user = new User(req.body);
  await user.save();
  res.json({ success: 'User created' });
});

//----------------------------------------Roger socket testing---------------------------------------------//
let room = "abc123";
io.on('connection', function(socket){
    console.log('User connented');
     // ta emot ett meddelande från en klient/socket
     socket.on('chat message', function(message){
      console.log('message: ', message);
       // skicka alla meddelanden till alla klienter/socket
       io.emit('chat message', message);
       io.emit('room', room, message);
     });
   });



io.sockets.on('connection', function(socket) {
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('room', function(room) {
        socket.join(room);
    });
});

// now, it's easy to send a message to just the clients in a given room
room = "abc123";
io.sockets.in(room).emit('chat message', 'what is going on, party people?');

// this message will NOT go to the client defined above
io.sockets.in('foobar').emit('message', 'anyone in this room yet?');




//----------------------------------------Roger socket testing---------------------------------------------//

//----------------------------------------original---------------------------------------------//

// io.on('connection', function(socket){
//   console.log('User connented');
//   // ta emot ett meddelande från en klient/socket
//   socket.on('chat message', function(message){
//     console.log('message: ', message);
//     // skicka alla meddelanden till alla klienter/socket
//     io.emit('chat message', message);
//   });
// });
//----------------------------------------original---------------------------------------------//


http.listen(port, function () {
  console.log('listening on *:' + port);
});
