import React from 'react';
import {Link} from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import {
//     Collapse,
//     Navbar,
//     NavbarToggler,
//     NavbarBrand,
//     Nav,
//     NavItem,
//     NavLink,
//     Container,
//     Row,
//     Col,
//     Jumbotron,
//     Button
// } from 'reactstrap';

const MainNavbar = () => (

    
        
        
            
            <Link to="/about">About</Link>
        
        
  /* <Navbar color="light" light expand="md">  
    {/* <NavbarToggler onClick={e => this.toggle()} /> */
    /*<Collapse isOpen={this.isOpen} navbar>*/
      /* <Nav className="ml-auto" navbar>
        <NavItem>
          <Link exact to="/" activeClassName = "active">Welcome</Link>
        </NavItem>
        <NavItem>
          <Link to="/about" activeClassName = "active">Clock</Link>
        </NavItem>
        <NavItem>
          <NavLink to="/todo-list" activeClassName = "active">Todo list</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/conditionals" activeClassName = "active">If-else</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/loops" activeClassName = "active">Loops</NavLink>
        </NavItem>
      </Nav>
    
  </Navbar> */
  

)
export default MainNavbar;