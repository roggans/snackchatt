import React from 'react';
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
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom'; 
import MainNavbar from './MainNavbar';
import Home from './Home';
import About from './About';
import People from './People/People';
import Chatt from './Chatt/Chatt';

import NotFound from './Notfound/Notfound';
import RegisterUser from './RegisterUser/RegisterUser';

const App = () => (
    <div>
    <BrowserRouter>
       
        <div>
            <MainNavbar /> 
             <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" render={ () => <About title='Hej på dig' /> } />
            <Route path="/register" component={RegisterUser} />
            <Route path="/people" component={People} />
            <Route path="/chat" component={Chatt} />
            <Route component={NotFound} />
            </Switch>
        </div>
        
    </BrowserRouter>
    {/* <LoginForm /> */}
    </div>
)

export default App;


















// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

// export default App;
