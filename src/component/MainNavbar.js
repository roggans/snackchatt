import React from 'react';
import {Link} from 'react-router-dom';

import { BrowserRouter as Router, Route } from 'react-router-dom';
 import {
     Collapse,
     Navbar,
     NavbarToggler,
     NavbarBrand,
     Nav,
     NavItem,
     NavLink,
     Container,
     Row,
     Col,
     Jumbotron,
     Button
 } from 'reactstrap';

const MainNavbar = () => (

    <div>    
        <Navbar color="light" light expand="md">
        <NavbarBrand to="/">
        
        React Warp Core
        </NavbarBrand>
        
        <Nav className="ml-auto" navbar>
            <NavItem>
             <Link exact to="/" activeClassName = "active">Welcome</Link>  {/*   Then changed to NavLink it dont work  */}
            </NavItem>
            <NavItem>
            <Link to="/about" activeClassName = "active">About</Link>
            </NavItem>
            
        </Nav>
        
      </Navbar>
    </div>
  
  

)
export default MainNavbar;