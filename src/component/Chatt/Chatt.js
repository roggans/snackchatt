import React, { Component } from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { ChatItem, MessageBox, SystemMessage,SideBar,Avatar,MessageList,Button, ChatList } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import openSocket from 'socket.io-client';
import EmojiPicker from 'emoji-picker-react';
import 'emoji-picker-react/dist/universal/style.scss';
import JSEMOJI from 'emoji-js';
import People from '../People/People';
//import sand from './sand.jpg'
import './Chatt.scss';
import InputWordCheck from '../InputWordCheck/InputWordCheck';

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
      message: this.state.message
    });

    // nollställ inmatningsfältet
    this.setState({ message: '' });

  }


  

  changeMessage(e) {        ////Check if input is a "fult ord"
    if(e.currentTarget.value==="katt"){
      
        alert('buse')
        this.setState({ message: '' })
      
      
    }else 
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

  render() {

    return (
      <div className="Chatt-container">

        <Container fluid>
          <Row>
            <Col xs="3" className="activeUsers">
            <ChatList
    className='chat-list'
    dataSource={[
        {
            avatar: 'https://facebook.github.io/react/img/logo.svg',
            alt: 'Reactjs',
            title: 'Facebook',
            subtitle: 'What are you doing?',
            date: new Date(),
            unread: 0,
        },
        {
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg',
            alt: 'Reactjs',
            title: 'Facebook',
            subtitle: 'What are you doing?',
            date: new Date(),
            unread: 0,
        },
        {
            avatar: 'https://facebook.github.io/react/img/logo.svg',
            alt: 'Reactjs',
            title: 'Facebook',
            subtitle: 'What are you doing?',
            date: new Date(),
            unread: 0,
        },
        {
            avatar: 'https://facebook.github.io/react/img/logo.svg',
            alt: 'Reactjs',
            title: 'Facebook',
            subtitle: 'What are you doing?',
            date: new Date(),
            unread: 0,
        },
        
    ]} />
            </Col>
           
              {/* <EmojiPicker onEmojiClick={(x) => this.insertEmoji(x)}/> */}

              <Col className="">
                <div className="messages">
                <MessageBox
                  position={'left'}
                  type={'text'}
                  text={this.state.messages.map((message, i) => <div className="speech-bubble" key={i}>
                  <People scale={1} avatar={message.user.avatar} /> {message.user.username}: {message.message}</div>)}
                  />
            
               <MessageBox
                  position={'right'}
                  type={'text'}
                  avatar={'https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg'}
                  text={this.state.messages.map((message, i) => <div className="speech-bubble" key={i}>
                  <People scale={1} avatar={message.user.avatar} /> {message.user.username}: {message.message}</div>)}
                  />
     <SystemMessage
              text={'Chatten är avslutad'}/>

              
<Avatar
    src={'https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg'}
    alt={'logo'}
    size="large"
    type="circle flexible"/>
             
              
<Button
    text={'click me!'} />

                  {this.state.messages.map((message, i) => <div className="speech-bubble" key={i}><People scale={1} avatar={message.user.avatar} /> {message.user.username}: {message.message}</div>)}</div>
                <div className="InputAndButton">
                  <input id="m" autocomplete="off"  maxlength="20" value={this.state.message} onKeyPress={e => e.key === 'Enter' && this.send()} onChange={e => this.changeMessage(e)} />
                  <button className="Sendbutton" onClick={e => this.send()}>Skicka</button>
                </div>
              </Col>
              <Col xs="3">
            <ListGroup>
                <ListGroupItem>Cras justo odio</ListGroupItem>
                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                <ListGroupItem>Morbi leo risus</ListGroupItem>
                <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
                <ListGroupItem>Vestibulum at eros</ListGroupItem>
              </ListGroup>
            </Col>
            

          </Row>
        </Container>
      </div>
    );
  }
}

export default Chatt;