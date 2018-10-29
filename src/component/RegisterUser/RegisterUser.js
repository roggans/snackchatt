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
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback,
    FormText,
    // Jumbotron,
    Button
} from 'reactstrap';
import People from '../People/People'

class RegisterUser extends Component {

    render() {
        return (
            <div className="main-content register">
                <Container>
                    <Row>
                        <Col>
                            <h2>Registrera dig/Ändra information</h2></Col>
                    </Row>
                    <Row>
                        <Col-6>
                            <People />
                        </Col-6>
                        <Col-3>
                        <Form>
                        <FormGroup>
                            <Label for="Username">Användarnamn</Label>
                            <Input type="text" style = {{...this.passwordStyle}} id="password" placeholder="Karl pedal" />
                            
                            <FormFeedback valid>Sweet! that name is available</FormFeedback>
                            <FormText>Example help text that remains unchanged.</FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            
                            <Input invalid id="email" placeholder="Email" />
                            <FormFeedback>Ajdå adressen har redan en registrerad användare</FormFeedback>
                            <FormText>Example help text that remains unchanged.</FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Lösenord</Label>
                            <Input type="password" id="password" placeholder="Lösenord"  />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Skriv lösenordet igen</Label>
                            <Input type="password" id="password" placeholder="Upprepa lösenord"  />
                        </FormGroup>
                    </Form>
                            
                        </Col-3>
                    </Row>
                    <Col-6>
                        <Button color="primary" size="lg" block>Skapa användare</Button> {/*onclick dont work */}
                    </Col-6>

                    <p>Klicka här för att skapa användaren</p>
                    <hr />
                    
                    <hr />
                   

                </Container>


            </div>
        );
    }
}

export default RegisterUser;