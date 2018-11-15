import React from 'react';
import People from '../People/People';
import './ActiveUserList.scss';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class Example extends React.Component {


  render() {
    return (
    <div>
<People className="float-left avatar-head-in-chat mr-3" head={true} scale="1" />
    
      <ListGroup>
        <ListGroupItem disabled tag="a" href="#"><People className="float-left avatar-head-in-chat" head={true} scale="1" />Cras justo odio</ListGroupItem>
        <ListGroupItem tag="a" href="#">Dapibus ac facilisis in</ListGroupItem>
        <ListGroupItem tag="a" href="#">Morbi leo risus</ListGroupItem>
        <ListGroupItem tag="a" href="#">Porta ac consectetur ac</ListGroupItem>
        <ListGroupItem tag="a" href="#">Vestibulum at eros</ListGroupItem>
      </ListGroup>
      </div>
    );
  }
}

