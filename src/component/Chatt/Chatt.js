import React, { Component } from 'react';
import { Container, Row, Col,ListGroup, ListGroupItem, Badge } from 'reactstrap';
import openSocket from 'socket.io-client';
import EmojiPicker from 'emoji-picker-react';
import 'emoji-picker-react/dist/universal/style.scss';
//import sand from './sand.jpg'
import './Chatt.scss';

class Chatt extends Component {    

  constructor(props){
    super(props);
    // message = meddelandet man håller på att skriva
    // messages = array med alla meddelanden
    this.state = {message: '', messages: []};

    // skapa en ny socket
    //this.socket = openSocket('', {path: '/api/socket'});
    this.socket = openSocket.connect('http://localhost:3010');

    // få socket att lyssna på när servern/backend skickar 'chat message'
    this.socket.on(
      'chat message', 
      (message) => {
        // vi tar emot meddelande från servern
        // och lägg till det nya meddelandet i state.messages

        this.setState({messages: [...this.state.messages, message]});
      }
    );
  }

  send(){
    // skicka meddelande till servern
    this.socket.emit('chat message', this.state.message);
    // nollställ inmatningsfältet
    this.setState({message: ''});
  }

  changeMessage(e){
    this.setState({message: e.currentTarget.value});
  }

  render() {
    
      return (
        <div className="Chatt-container">
        
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
         <Col className="d-flex justify-content-end mt-5">
          <ListGroup>
          <ListGroupItem>Aktiva Chattar</ListGroupItem>
        <ListGroupItem>Roger och Kalle <Badge pill>14</Badge></ListGroupItem>
        <ListGroupItem>Roger och Charlie <Badge pill>2</Badge></ListGroupItem>
        <ListGroupItem>Roger och Fredrik <Badge pill>1</Badge></ListGroupItem>
      </ListGroup>
      </Col> </Row><Row><Col className="d-flex justify-content-end mt-5">
<EmojiPicker preload/>
      </Col>
      </Row>
       
      </Container>
     </div>
    );
  }
}

export default Chatt;