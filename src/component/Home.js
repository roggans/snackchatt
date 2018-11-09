import React, { Component} from 'react';
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
  Jumbotron,
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
 const style = {
    margin:'50px'
  };

class Home extends Component {    

  constructor(props){
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
    this.setState({ LoginPassword: e.currentTarget.value});
  }

  async handleUserApproved(){
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
    if(result.data.success === "Login ok"){
      window.localStorage.loggedInUser = JSON.stringify(result.data.userObject);
      console.log("SPARAT I LOCALSTORAGE");
      this.props.history.push('/chat');

      // EXEMPEL:
      // Var än du vill kolla om användaren är inloggad och uppgifter som username, e-post, avatar etc:
      let user = JSON.parse(window.localStorage.loggedInUser);
      if(user){
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
      <div className="main-content home">
      <div className='Login-component'></div>
      <Container className='Login-component'>
            <Row>
              <Col>
              <Jumbotron className="bg-light text-dark" style ={style}>
        <h1 className="display-3">Chatta med dina vänner</h1>
        <p className="lead">Detta är en chatt med inriktning till yngre. 3-6 år. Vänligen håll språket vårdat.</p>
        <hr className="my-2" />
        <p>Har du inget konto? Inga problem. Registrera dig genom att klicka på knappen nedan. Det tar endast 2minuter. Vi ses i chatten!</p>
        <p className="lead">
          <Button  tag={Link} to="/register" color="primary">Registrera konto</Button>
        </p>
        
      
      <Form inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="userId" className="mr-sm-2">Användarnamn</Label>
          <Input type="text" id="userId" placeholder="Kalle Anka" value={this.state.LoginUsername} onChange={e => this.usernameCheck(e)} />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="LoginPassword" className="mr-sm-2">Lösenord</Label> 
          <Input type="password" id="userPassword" placeholder="Lösenord" value={this.state.userPassword} onChange={e => this.userPasswordCheck(e)} />
        </FormGroup>
        <Button onClick={()=>this.handleUserApproved()}>Skicka</Button>
      </Form>
              </Jumbotron>
              </Col>
            </Row>
      </Container>
        
        
      </div>
    );
  }
}

export default withRouter(Home);