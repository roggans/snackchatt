import React, { Component } from 'react';
import { Link } from "react-router-dom";

import {
  // Collapse,
  //Navbar,
  // NavbarToggler,
  //NavbarBrand,
  //Nav,
  //NavItem,
  //NavLink,
  Container,
  Row,
  Col,
  //Jumbotron,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import './Home.css';
import axios from 'axios';
import { withRouter } from "react-router-dom";
//import Loginform from './Loginform/Loginform';
// const style = {
//   margin: '50px',
//   //backgroundColor: 'rgba(52, 52, 52, 0.8)'

// };

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      LoginUsername: '',
      LoginPassword: '',
    }
  }

  usernameCheck(e) {
    this.setState({ LoginUsername: e.currentTarget.value });
  }

  userPasswordCheck(e) {
    this.setState({ LoginPassword: e.currentTarget.value });
  }

  async handleUserApproved() {
    console.log(this.state.LoginPassword);
    console.log(this.state.LoginUsername);
    let toPost = {
      username: this.state.LoginUsername,
      password: this.state.LoginPassword
    };
    //kolla om användarnamn och lösenord stämmer med db
    let result = await axios.post('/api/login', toPost);
    console.log(result)
    // för närvarande snabb "prototyp"-lösning på login
    // (inte säker men låter oss ta reda på användarnamn så att 
    // vi kan vidareutveckla chatten)
    if (result.data.success === "Login ok") {
      window.localStorage.loggedInUser = JSON.stringify(result.data.userObject);
      console.log("SPARAT I LOCALSTORAGE");
      this.props.history.push('/chat');

      // EXEMPEL:
      // Var än du vill kolla om användaren är inloggad och uppgifter som username, e-post, avatar etc:
      let user = JSON.parse(window.localStorage.loggedInUser);
      if (user) {
        // inloggad
        console.log('user', user, user.username);
      }
      else {
        // inte inloggad (hindra kanske från att gå till chatt etc)
      }

      // Om du vill logga ut användaren
      // delete window.localStorage.loggedInUser

    }
  }

  render() {
    return (
      <div className="background">
        <div className="main-content">
          {/* <div className='Login-component'></div> */}
          <Container className='Login-component'>
            <Row>
              <Col xs="4">
                <h1 className="mt-4 justering display-3">Chatta med dina vänner</h1>
              </Col>
            </Row>

            <Row>
              <Col xs="6" className="">
                <Form inline>
                  <FormGroup className="">
                    <Label for="userId" className="">Namn</Label>
                    <Input type="text" id="userId" placeholder="Vad heter du?" value={this.state.LoginUsername} onChange={e => this.usernameCheck(e)} />
                  </FormGroup></Form>
              </Col>


            </Row>


            <Row>
              <Col xs="4" className="homeInloggFields justering">
                <Form inline>
                  <FormGroup className="">
                    <Label for="LoginPassword" className="">Lösen</Label>
                    <Input type="password" id="userPassword" placeholder="Lösenord" value={this.state.userPassword} onChange={e => this.userPasswordCheck(e)} />

                    <Button onClick={() => this.handleUserApproved()}>Skicka</Button>
                  </FormGroup></Form>
              </Col>
            </Row>
            <Row>
              <Col xs="6" className="homeInloggFields justering">
                <Button className="register-btn" tag={Link} to="/register">Registrera konto</Button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);

