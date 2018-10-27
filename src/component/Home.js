import React, { Component } from 'react';
import {
  // Collapse,
  Navbar,
  // NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  //NavLink,
   Container,
   Row,
   Col,
  // Jumbotron,
  // Button
} from 'reactstrap';

class Home extends Component {    
  
  render() {
    return (
      <div className="main-content home">
      <Container>
        <Row>
          <Col>
            <h2>Snackchatt</h2></Col>
            </Row><Row>
              <p>Här kan du prata och köra tågchatten</p>
            </Row>
            <Col>
            
            </Col>
          
          <p>Börja med att registrera dig</p>
          <hr />
          
        
      </Container>
        
        
      </div>
    );
  }
}

export default Home;