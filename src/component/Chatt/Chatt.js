import React, { Component } from 'react';
import openSocket from 'socket.io-client';
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
  
  /*(<div>
     {this.messages.map((message, i) =>
    <Row key = {i} className="pt-3">
      <Col>
        {message}
      </Col>
    </Row>
  )}
  <Row className="bg-secondary fixed-bottom p-4">
    <Col>
      <InputGroup>  
        <Input placeholder="Write your message here" 
          value={this.message} 
          onChange={e => this.message = e.currentTarget.value} 
          onKeyPress={e => e.key === 'Enter' && this.send()}
        />
        <InputGroupAddon addonType="append">
          <Button color="primary" onClick={e => this.send()}>Send</Button>
        </InputGroupAddon>
      </InputGroup>
    </Col>
  </Row>
  </div>
  )*/

  render() {
    return (
      <div className="Chatt-div">
      <div className="messages">
      {this.state.messages.map((message, i) => <div key={i}>{message}</div>)}
      </div>
      <input id="m" autocomplete="off" value={this.state.message}  onKeyPress={e => e.key === 'Enter' && this.send()} onChange={e => this.changeMessage(e)} /><button onClick={e => this.send()}>Send</button>
      </div>
    );
  }
}

export default Chatt;