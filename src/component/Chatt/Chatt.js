import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import 'react-chat-elements/dist/main.css';
import openSocket from 'socket.io-client';
//import EmojiPicker from 'emoji-picker-react';
import 'emoji-picker-react/dist/universal/style.scss';
import AcceptInvite from '../AcceptInvite/AcceptInvite';
import JSEMOJI from 'emoji-js';
import People from '../People/People';
//import sand from './sand.jpg'
import './Chatt.scss';

import ActiveUserList from '../ActiveUserList/ActiveUserList';
import Activechatrooms from '../Activechatrooms/Activechatrooms';
import Topinfobar from '../Topinfobar/Topinfobar';

//emoji set up
let jsemoji = new JSEMOJI();
// set the style to emojione (default - apple)
jsemoji.img_set = 'emojione';
// set the storage location for all emojis
jsemoji.img_sets.emojione.path = 'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/';

class Chatt extends Component {

  constructor(props) {
    super(props);
    // message = meddelandet man håller på att skriva
    // messages = array med alla meddelanden
    this.state = {
      message: '',
      messages: [],
      emojiShown: false,
      room: "Gemensam chatt"
    };

    // skapa en ny socket
    //this.socket = openSocket('', {path: '/api/socket'});
    this.socket = openSocket.connect('http://localhost:3010');


    // få scoket att lyssa ner servern skicar 'chat messages' (obs flera meddelanden på en gång!)
    this.socket.on(
      'chat messages',
      (messages) => {
        // convert dateTime for every message
        for(let message of messages){
          let dateObj = new Date(message.dateTime);
          message.dateTime = dateObj.toLocaleString();
        }
        console.log("MEDDEELANDEN FRÅN SERVERN",messages)
        // add all messages to this.state.message
        this.setState({ messages: [...this.state.messages, ...messages] });
      }
      
    )

    // få socket att lyssna på när servern/backend skickar 'chat message'
    this.socket.on(
      'chat message',
      (message) => {
        let dateObj = new Date(message.dateTime);
        message.dateTime = dateObj.toLocaleString();
        console.log("TOG EMOT", message)
        this.socket.emit('join_room',{room: 'room1'});
        // vi tar emot meddelande från servern
        // och lägg till det nya meddelandet i state.messages
        //event for sockets connected with room1
      this.socket.on('msg_for_room1', function (msg) {
        console.log(msg);
});

        this.setState({ messages: [...this.state.messages, message] });
        // Scroll to bottom
        setTimeout(function () {
          // if we move to user the main body scroll:
          // remove current line and replace with
          //window.scrollTo(0, 1000000000);
          document.querySelector('.messages').scrollTop = 1000000000;
        }, 10);
      }
    );
  }

  

  send() {
    // skicka meddelande till servern
    this.socket.emit('chat message', {
      user: JSON.parse(window.localStorage.loggedInUser),
      text: this.state.message,
      room: this.state.room
    });

    // nollställ inmatningsfältet
    this.setState({ message: '' });
  }

  changeMessage(e) {        ////Check if input is a "fult ord"
    //   //if (e.currentTarget.value.toLowerCase() === "jävla") {
    //     if (e.currentTarget.value.toLowerCase() === 'katt') {

    //     alert('Inga fula ord i chatten!')
    //     this.setState({ message: '' })

    //   } else
    //     this.setState({ message: e.currentTarget.value })
    // }
    let str = e.currentTarget.value.toLowerCase();

    let uglyWords = ["jävla", "fanskap", "satan"];

    for (let word of uglyWords) { str = str.split(word).join('***'); }


    this.setState({ message: str })
  }

  changeRoomHandler = (roomname) => {
    console.log('val av rum klickad på!!!', roomname);
    this.setState({ 'room': roomname});
  }



  insertEmoji = (emojiCode) => {
    /*this.setState({
      emojiShown: !this.state.emojiShown
    });*/
    console.log(emojiCode)
    emojiCode = parseInt(emojiCode, 16);
    console.log(emojiCode);
    let emoji = String.fromCodePoint(emojiCode);
    this.setState({ message: this.state.message + emoji });
  }


  //läs in vem som är inloggad och användes i aktiva användare i render() med this.user.username
  user = JSON.parse(window.localStorage.loggedInUser);

  render() {

    //* filter för att endast visa meddelande som ska ses i rätt rum 
//     let rooms = this.messages.filter(function(room){
//     return this.state.room === this.loggedInUser.room;
// });

    return (
      <div className="Chatt-container">
        <Topinfobar room={this.state.room} />
        <Container fluid>
          <Row>
            <Col xs="3" className="activeUsers">
              {/* <h3 className="activeuserlist">Aktiva användare</h3> */}
              <ActiveUserList />
            </Col>

            <Col xs="6" className="">
              {/* <h3 className="activeuserlist">Gemensam Chatt</h3>    ska ändra namn till den chatt du är i */}
              <div className="messages">
                {this.state.messages.filter(m=>m.room === this.state.room).map((message, i) => <div key={i} className="display-message">
                  <People className="float-left avatar-head-in-chat mr-3" head={true} scale="1" avatar={message.user.avatar} />
                  <p className="mb-1"><b>{message.user.username} {message.dateTime}</b></p>
                  <p className="mb-2">{message.text}</p>
                  <p></p>
                  {/* <hr></hr>  //tar bort linjen i varje meddelande*/}
                </div>)}
              </div>


            </Col>
            <Col xs="3" >
            {/* <Activechatrooms roomname={chatRoom}  /> */}
              {/* <h3 className="activeuserlist">Mina chatt-rum</h3> */}
              {JSON.parse(window.localStorage.loggedInUser).chatRooms.map(chatRoom =>
                
                <Activechatrooms roomname={chatRoom} onClick={this.changeRoomHandler}/>
              )}
            </Col>
          </Row>
          <Row>
            <Col xs="12">

              <div className="text-center mt-1">
              <span className="input">
                <input className="InputAndButton" id="m" autoComplete="off" maxLength="3000" value={this.state.message} onKeyPress={e => e.key === 'Enter' && this.send()} onChange={e => this.changeMessage(e)} />
                <button className="Sendbutton" onClick={e => this.send()}>Skicka</button></span>

                {/* <button onClick={this.showEmojis}>😀</button> */}
                <AcceptInvite />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Chatt;