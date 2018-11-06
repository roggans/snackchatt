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
  // Jumbotron,
   Button
} from 'reactstrap';
import Loginform from './Loginform/Loginform';

class Home extends Component {    

 
  
  render() {
    return (
      <div className="main-content home">
      <Container>
        {/* <Row>
          <Col>
            <h2>Snackchatt</h2></Col>
            </Row> */}
            <Row>
              <Col>
              <h3>Här kan du prata med kompisar i åldern 3-6år</h3>
              <p>Om du inte redan har registrerat dig så börja med det.</p>
              </Col>
            </Row>
            <Col-6>
             <Button onClick={this.showModal} color="primary" size="lg" block>Logga in</Button> {/*onclick dont work */}
            </Col-6><Loginform />
          
          <p>Klicka här för att logga in</p>
          <hr />
          <Col-6>
            <Button color="primary" size="lg" block>Registrera dig</Button>
            </Col-6>
          
          <p>Klicka här för att registrera dig</p>
          <hr />
          
        
      </Container>
        
        
      </div>
    );
  }
}

export default Home;