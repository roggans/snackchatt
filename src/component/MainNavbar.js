import React from 'react';
import {NavLink} from 'react-router-dom';
// import { BrowserRouter as Router, Route } from 'react-router-dom';

import {
     // Collapse,
     Navbar,
     // NavbarToggler,
     NavbarBrand,
     Nav,
     NavItem,
     //NavLink,
     // Container,
     // Row,
     // Col,
     // Jumbotron,
     // Button
 } from 'reactstrap';

const MainNavbar = () => (

    <div>    
        <Navbar color="light" light expand="md">
        <NavbarBrand to="/">
        
        Snackchatt
        </NavbarBrand>
        
        <Nav className="ml-auto" navbar>
            <NavItem>
             <NavLink exact to="/" activeStyle={{background: 'tomato'}}>Startsida</NavLink> 
            </NavItem>
            <NavItem>
            <NavLink to="/about" activeStyle={{background: 'green'}}>About</NavLink>
            </NavItem>
            <NavItem>
            <NavLink to="/people" activeStyle={{background: 'green'}}>People</NavLink>
            </NavItem>
            
        </Nav>
        
      </Navbar>
    </div>
  
  

)
export default MainNavbar;