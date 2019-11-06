import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import 'react-chat-elements/dist/main.css';
import Toggle from '../Toggle'
import openSocket from 'socket.io-client';
import EmojiPicker from 'emoji-picker-react';
import 'emoji-picker-react/dist/universal/style.scss';
//import AcceptInvite from '../AcceptInvite/AcceptInvite';
import JSEMOJI from 'emoji-js';
import People from '../People/People';
//import sand from './sand.jpg'
import './Chatt.scss';

import ActiveUserList from '../ActiveUserList/ActiveUserList';
import Activechatrooms from '../Activechatrooms/Activechatrooms';
import Topinfobar from '../Topinfobar/Topinfobar';
//import JoinRoom from '../JoinRoom/JoinRoom';

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


    // få socket att lyssa när servern skickar 'chat messages' (obs flera meddelanden på en gång!)
    this.socket.on(
      'chat messages',
      (messages) => {
        // convert dateTime for every message
        for (let message of messages) {
          let dateObj = new Date(message.dateTime);
          message.dateTime = dateObj.toLocaleString();
        }
        console.log("MEDDELANDEN FRÅN SERVERN", messages)
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
    let str = e.currentTarget.value.toLowerCase();

    let uglyWords = ["jävla", "fanskap", "satan"];

    for (let word of uglyWords) { str = str.split(word).join('***'); }
    this.setState({ message: str })
  }

  changeRoomHandler = (roomname) => {
    console.log('val av rum klickad på!!!', roomname);
    this.setState({ 'room': roomname });
  }

  userclickedHandler = (mee) => {
    console.log('du klickade på ', mee);
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
          <Row className="pointer">

            {JSON.parse(window.localStorage.loggedInUser).chatRooms.map(chatRoom =>

              <Activechatrooms roomname={chatRoom} onClick={this.changeRoomHandler} />

            )}

          </Row>


          {/* <ActiveUserList onClick={this.userclickedHandler} /> */}



          {/* d-none d-xs-none d-md-block d-lg-block */}

          {/* <Activechatrooms roomname={chatRoom}  /> */}
          {/* <h3 className="activeuserlist">Mina chatt-rum</h3> */}




          <Row>
            <Col xs="12" md="6" lg="6" className="mb-3">

              <div className="messages">
                {this.state.messages.filter(m => m.room === this.state.room).map((message, i) => <div key={i} className="display-message">
                  <People className="float-left avatar-head-in-chat mr-3" head={true} scale="1" avatar={message.user.avatar} />
                  <p className="mb-1"><b>{message.user.username} {message.dateTime}</b></p>
                  <p className="mb-2">{message.text}</p>
                  <p></p>
                  {/* <hr></hr>  //tar bort linjen i varje meddelande*/}
                </div>)}
              </div>


            </Col>


            <div className="ml-3">
              <Toggle>
                <EmojiPicker onEmojiClick={(x) => this.insertEmoji(x)} />
              </Toggle>
            </div>

            <Col xs="6" md="3" lg="3" className="d-none d-xs-block d-md-block d-lg-block">
              <h6>Aktiva användare</h6>
              <ActiveUserList onClick={this.userclickedHandler} />
            </Col>

            <Col xs="8">

              <div className="text-center mt-1">
                <span className="input">

                  <input className="InputAndButton" placeholder="Skriv text här" id="m" autoComplete="off" maxLength="3000" value={this.state.message} onKeyPress={e => e.key === 'Enter' && this.send()} onChange={e => this.changeMessage(e)} />

                  <button className="Sendbutton" onClick={e => this.send()}>Skicka</button></span>



              </div>
            </Col>
          </Row>




          <Row>

            <Col className="mt-3 ">
              <div className="roger">

              </div>
            </Col>
          </Row>

        </Container>
      </div >
    );
  }
}

export default Chatt;