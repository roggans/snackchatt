import React, { Component } from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { ChatItem, MessageBox, SystemMessage, SideBar, Avatar, MessageList, Button, ChatList } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import openSocket from 'socket.io-client';
import EmojiPicker from 'emoji-picker-react';
import 'emoji-picker-react/dist/universal/style.scss';
import JSEMOJI from 'emoji-js';
import People from '../People/People';
//import sand from './sand.jpg'
import './Chatt.scss';
import InputWordCheck from '../InputWordCheck/InputWordCheck';
import ActiveUserList from '../ActiveUserList/ActiveUserList';

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
      emojiShown: false
    };


    // skapa en ny socket
    //this.socket = openSocket('', {path: '/api/socket'});
    this.socket = openSocket.connect('http://localhost:3010');

    // få socket att lyssna på när servern/backend skickar 'chat message'
    this.socket.on(
      'chat message',
      (message) => {
        // vi tar emot meddelande från servern
        // och lägg till det nya meddelandet i state.messages

        this.setState({ messages: [...this.state.messages, message] });
        // Scroll to bottom
        setTimeout(function () {
          // if we move to user the main body scroll:
          // remove current line and replace with
          //window.scrollTo(0, 1000000000);
          // document.querySelector('.messages').scrollTop = 1000000000;
        }, 10);
      }
    );
  }

  send() {
    // skicka meddelande till servern
    this.socket.emit('chat message', {
      user: JSON.parse(window.localStorage.loggedInUser),
      message: this.state.message,

    });

    // nollställ inmatningsfältet
    this.setState({ message: '' });

  }




  changeMessage(e) {        ////Check if input is a "fult ord"
    if (e.currentTarget.value === "katt") {

      alert('Inga fula ord i chatten!')
      this.setState({ message: '' })


    } else
      this.setState({ message: e.currentTarget.value })



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

    return (
      <div className="Chatt-container">

        <Container fluid>
          <Row>
            <Col xs="3" className="activeUsers">
              <h3 className="activeuserlist">Aktiva användare</h3>
              <ActiveUserList />
            </Col>

            {/* <EmojiPicker onEmojiClick={(x) => this.insertEmoji(x)}/> */}

            <Col className="">
              <h3 className="activeuserlist">Gemensam Chatt</h3>    {/*ska ändra namn till den chatt du är i*/}
              <div className="messages">
                 {this.state.messages.map((message, i) => <div key={i} className="display-message"> 
                    <People className="float-left avatar-head-in-chat mr-3" head={true} scale="1" avatar={message.user.avatar} />
                    <p className="mb-1"><b>{message.user.username}</b></p>
                    <p className="mb-2">{message.message}</p>
                  </div>)}
              </div>
              <div className="InputAndButton">
                <input id="m" autoComplete="off" maxLength="3000" value={this.state.message} onKeyPress={e => e.key === 'Enter' && this.send()} onChange={e => this.changeMessage(e)} />
                <button className="Sendbutton" onClick={e => this.send()}>Skicka</button>
              </div>
            </Col>
            <Col xs="3">
              <h3 className="activeuserlist">Mina chatt-rum</h3>
              <ChatList
                className='chat-list'
                dataSource={[
                  {
                    avatar: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg',
                    alt: 'Reactjs',
                    title: 'Gemensam Chatt',
                    subtitle: 'Alla chattar med alla!',
                    date: new Date(),
                    unread: 0,
                  },
                  {
                    avatar: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg',
                    alt: 'Reactjs',
                    title: 'Mitt eget chattrum',
                    subtitle: 'Bjud in vem du vill',
                    date: new Date(),
                    unread: 0,
                  },
                  {
                    avatar: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg',
                    alt: 'Reactjs',
                    title: 'Jannes chattrum',
                    subtitle: 'What are you doing?',
                    date: new Date(),
                    unread: 0,
                  },
                  {
                    avatar: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg',
                    alt: 'Reactjs',
                    title: 'Kalle ankas chattrum',
                    subtitle: 'What are you doing?',
                    date: new Date(),
                    unread: 0,
                  },

                ]} />
            </Col>


          </Row>
        </Container>
      </div>
    );
  }
}

export default Chatt;