import React, { Component } from 'react';
import { Container, Row, Col,ListGroup, ListGroupItem, Badge } from 'reactstrap';
import openSocket from 'socket.io-client';
import EmojiPicker from 'emoji-picker-react';
import 'emoji-picker-react/dist/universal/style.scss';
import JSEMOJI from 'emoji-js';
//import sand from './sand.jpg'
import './Chatt.scss';

//emoji set up
let jsemoji = new JSEMOJI();
// set the style to emojione (default - apple)
jsemoji.img_set = 'emojione';
// set the storage location for all emojis
jsemoji.img_sets.emojione.path = 'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/';

class Chatt extends Component {    

  constructor(props){
    super(props);
    // message = meddelandet man håller på att skriva
    // messages = array med alla meddelanden
    this.state = {message: '',
     messages: [],
     emojiShown: false
    };

    // skapa en ny socket
    //this.socket = openSocket('', {path: '/api/socket'});
    this.socket = openSocket.connect('http://localhost:3010');

    // få socket att lyssna på när servern/backend skickar 'chat message'

    //------------------------------------------Roger testar--------------------------------------
    this.socket.on(
           'chat message', 
           (message) => {
             // vi tar emot meddelande från servern
             // och lägg till det nya meddelandet i state.messages
    
             this.setState({messages: [...this.state.messages, message]});
           }
         );
       }
//-----------------------------nedan fungerar--------utkommenterat för test--------------
  //   this.socket.on(
  //     'chat message', 
  //     (message) => {
  //       // vi tar emot meddelande från servern
  //       // och lägg till det nya meddelandet i state.messages

  //       this.setState({messages: [...this.state.messages, message]});
  //     }
  //   );
  // }
  send(){
    this.socket.emit('chat message', this.state.message);
    this.setState({message:''});
  }
 


  //orginal send()---utkommenterat för test
  // send(){
  //   // skicka meddelande till servern
  //   this.socket.emit('chat message', this.state.message);
  //   // nollställ inmatningsfältet
  //   this.setState({message: ''});
  // }

  changeMessage(e){
    this.setState({message: e.currentTarget.value});
  }

  insertEmoji = (emojiCode) => {
    /*this.setState({
      emojiShown: !this.state.emojiShown
    });*/
    console.log(emojiCode)
    emojiCode = parseInt(emojiCode, 16);
    console.log(emojiCode);
    let emoji = String.fromCodePoint(emojiCode);
    this.setState({message: this.state.message + emoji});
  }

  render() {
    
      return (
        <div className="Chatt-container">
        <EmojiPicker onEmojiClick={(x) => this.insertEmoji(x)}/>
        
      <Container>
        <Row className=" fixed-bottom p-4">  
      <div className="messages">
      
      {this.state.messages.map((message, i) => <div key={i}>{message}</div>)}</div>
      <div className="InputAndButton">
      <input id="m" autocomplete="off" value={this.state.message}  onKeyPress={e => e.key === 'Enter' && this.send()} onChange={e => this.changeMessage(e)} />
      <button className="Sendbutton" onClick={e => this.send()}>Send</button>
      </div>
      </Row>
          {/* </Col> */}
         
        
        <Row>
          <Col className="InloggedUsers">
          <p>Inloggade användare</p>
          <p>Klicka på en användare du vill starta en egen chatt med.</p>
          </Col>
         <Col className="d-flex justify-content-end mt-5">
          <ListGroup>
          <ListGroupItem>Aktiva Chattar</ListGroupItem>
          <ListGroupItem>Grushögen #"General" <Badge pill>14</Badge></ListGroupItem>
        <ListGroupItem>"Sandlåda" Roger och Kalle <Badge pill>14</Badge></ListGroupItem>
        <ListGroupItem>"Sandlåda" Roger och Charlie <Badge pill>2</Badge></ListGroupItem>
        <ListGroupItem>"Sandlåda" Roger och Fredrik <Badge pill>1</Badge></ListGroupItem>
      </ListGroup>
      </Col> </Row><Row><Col className="d-flex justify-content-end mt-5">
{/* <EmojiPicker preload/> */}
      </Col>
      </Row>
       
      </Container>
     </div>
    );
  }
}

export default Chatt;