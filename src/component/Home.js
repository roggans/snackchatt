import React, { Component } from 'react';
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
//import Loginform from './Loginform/Loginform';
 const style = {
    background:'rgb(240, 228, 228)',
    margin:'40px'
  };
class Home extends Component {    
 
  render() {
    return (
      <div className="main-content home">
      <div className='Login-component'></div>
      <Container className='Login-component'>
            <Row>
              <Col>
              <Jumbotron className="bg-light" style ={style}>
        <h1 className="display-3">Chatta med dina vänner</h1>
        <p className="lead">Detta är en chatt med inriktning till yngre. 3-6 år. Vänligen håll språket vårdat.</p>
        <hr className="my-2" />
        <p>Har du inget konto? Inga problem. Registrera dig genom att klicka på knappen nedan. Det tar endast 2minuter. Vi ses i chatten!</p>
        <p className="lead">
          <Button color="primary">Registrera konto</Button>
        </p>
      
      <Form inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="exampleEmail" className="mr-sm-2">Användarnamn</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="Kalle Anka" />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="examplePassword" className="mr-sm-2">Lösenord</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="Lösenord" />
        </FormGroup>
        <Button>Skicka</Button>
      </Form>
              </Jumbotron>
              </Col>
            </Row>
      </Container>
        
        
      </div>
    );
  }
}

export default Home;