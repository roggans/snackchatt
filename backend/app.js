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
let User = mongoose.model('User', UserSchema);


// another schema  - message
let MessageSchema =  mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  room: String,
  text: String,
  dateTime: {type: Date, default: Date.now}
});

// create a model from the schema
let Message = mongoose.model('Message', MessageSchema);


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

app.post('/login', async (req, res) => {
  console.log(req.body.username, req.body.password);
  let matchingUsers = await User.find(req.body);
  if(matchingUsers.length < 1){
    res.json({error: 'Login failed'});
  }
  else {
    let user = matchingUsers[0];
    delete user.password;
    res.json({success: 'Login ok', userObject: user});
  }
})

 // When a new socket/client connects
 io.on('connection', function(socket){

   // We get the socket connecting: socket
   console.log('User connented');

   // We add event listeners to the socket 
   // that listens to messages from the socket/client
   socket.on('chat message', async function(message){
     // Create a Mongoose-model based object (since Message is a Mongoose model)
     let dbMessage = new Message({
       user: message.user._id,
       text: message.message,
       room: 'general'
     });
     // Store the message in the database
     await dbMessage.save();
     // We can choose to send a message to ALL connected socket
     // using io.emit:
     io.emit('chat message', message);
   });

 });
//------------------------------Rogertest------------------------------------------//



http.listen(port, function(){
  console.log('listening on *:' + port);
});
 

async function getAllMessages(){
  let messages = await Message.find().populate('user').exec();
  console.log(messages);
}

getAllMessages();