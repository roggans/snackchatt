import React from 'react';
import {
  Button,
  Modal,
  //ModalHeader,
  ModalBody,
  //ModalFooter,
  Container,
  FormGroup,
  Form,
  Col,
  Label,
  Input
} from 'reactstrap';
import './Loginform.css'

class ModalExample extends React.Component {
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
        <Button className="Loginbutton" color="danger" onClick={this.toggle}>{this.props.buttonLabel}Logga in</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>

          <ModalBody>
            <Container className="App">
              <h2>Logga in</h2>
              <Form className="form">
                <Col>
                  <FormGroup>
                    <Label>Användarnamn</Label>
                    <Input
                      type="text"
                      name="text"
                      id="Userinput"
                      placeholder="Skriv ditt användarnamn här"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="examplePassword">Lösenord</Label>
                    <Input
                      type="password"
                      name="password"
                      id="Userpassword"
                      placeholder="Skriv ditt lösenord här"
                    />
                  </FormGroup>
                </Col>
                <Button>Skicka</Button>
              </Form>
            </Container>
          </ModalBody>

        </Modal>
      </div>
    );
  }
}

export default ModalExample;