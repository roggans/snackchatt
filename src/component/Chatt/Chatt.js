import React, { Component } from 'react';

class Chatt extends Component {    
  
  render() {
    return (
      <div className="Chatt-div">
        <ul id="messages"></ul>
    <form action="">
      <input id="m" autocomplete="off" /><button>Send</button>
    </form>
        
      </div>
    );
  }
}

export default Chatt;