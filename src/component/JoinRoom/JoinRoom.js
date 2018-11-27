
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Invitepng from './invite.png';
import './JoinRoom.scss';

class JoinRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
      
        <Button className="acceptRoomInvitebtn" onClick={this.toggle}>{this.props.buttonLabel}<img src={Invitepng} alt="adduser"></img></Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Bjuda in "Denna användaren" i ditt rum?</ModalHeader>
          <ModalBody>
           Bjud in "Denna användaren" för att chatta privat i ditt eget rum. Endast du och dom som är i ditt rum kommer att se meddelandena som skrivs där.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Ja gärna</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Nej, jag ångrade mig</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default JoinRoom;