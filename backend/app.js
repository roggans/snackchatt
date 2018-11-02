const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3010;
const mongoose = require('mongoose');

// Needed to be able to read req.body for post and put requests
const bodyparser = require('body-parser');
app.use(bodyparser.json());

mongoose.connect('mongodb://localhost/snackchatt');

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
        default: ['general']
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
  let usersWithSameUserName = await User.find({username: req.body.username});
  if(usersWithSameUserName.length > 0){
    res.json({error:'Username taken'});
  }
  // we expect req.body (sent from frontend) to be an object
  // following the User schema (chatRooms doesn't have to be filled in)
  let user = new User(req.body);
  await user.save();
  res.json({success: 'User created'});
});



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
