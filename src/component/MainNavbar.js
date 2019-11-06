import React from 'react';
//import logo from './trace.gif';
import { NavLink } from 'react-router-dom';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import './MainNavbar.css';


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
        <Navbar className="navbarstyle" expand="md">
            <NavbarBrand to="/">
                {/* <img alt="React" className="logo" src={logo} /> */}
                Snackchatt
        </NavbarBrand>



            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink className="navlinkstyle" exact to="/">Startsida</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/about" className="navlinkstyle"> About </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/register" className="navlinkstyle"> Registrera användare </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/chat" className="navlinkstyle"> Till chatten </NavLink>
                </NavItem>


            </Nav>

        </Navbar>
    </div>



)
export default MainNavbar;