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
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback,
    FormText,
    // Jumbotron,
    Button
} from 'reactstrap';

import People from '../People/People';
import axios from 'axios';
//import Loginform from './Loginform/Loginform'

class RegisterUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordCheck: '',
            avatar: '',
            usernameValid: false,
            emailValid: false,
            passwordValid: false,
            passwordCheckValid: false
        };
        this.peopleProps = {
            messageFromPeople: (obj) => {
                this.setState({avatar: obj.currentPerson});
                this.validation();
            }
        }
    }



    changeUsername(e) {
        this.setState({ username: e.currentTarget.value });
        this.validation();
    }

    changeEmail(e) {
        this.setState({ email: e.currentTarget.value });
        this.validation();
    }

    changePassword(e) {
        this.setState({ password: e.currentTarget.value });
        this.validation();
    }

    changePasswordCheck(e) {
        this.setState({ passwordCheck: e.currentTarget.value });
        this.validation();
    }


    validation(){
        // perform all neccassary validations (after a short timeout so that state changes)
        setTimeout(()=>{
            this.setState({passwordCheckValid: this.state.password === this.state.passwordCheck});
            this.setState({usernameValid: this.state.username.length > 2});
            let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            this.setState({emailValid: this.state.email.length > 7 && re.test(this.state.email) });
            this.setState({passwordValid: this.state.password.length > 5})
            console.log(this.state);
        }, 1);
    }

    async handleSubmit(){
        if(this.state.usernameValid && this.state.emailValid && this.state.passwordValid && this.state.passwordCheckValid) {
            // make API call - submit to server
            let toPost = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                avatar: this.state.avatar
            };
            console.log("SKICKAR DETTA TILL SERVER", toPost)
            let result = await axios.post('/api/register', toPost);
            if(result.data.error === 'Username taken'){
                alert("Ledsen! En användare med detta användarnamn finns redan! Pröva att byta till ett annat");
            }
            if(result.data.success === 'User created'){
                //this.render({Loginform}     //jag vill visa loginformuläret men det vill inte react tydligen :( 
                // Vad ska vi göra nu?
                // Säga grattis eller kolla till din mail - gå till en inloggningsssida eller vad?
            }
            console.log("RESULT", result)
        }
        else {
            // Still invalid fields so can't submit
            this.setState({triedToSubmit: true});
        }
    }

    render() {
        return (
            <div className="main-content register">
                <Container>
                    <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <h2>Registrera dig/Ändra information</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={{ size: 'auto', offset: 1 }}>
                            <People {...this.peopleProps}  />
                        </Col>
                        <Col sm={{ size: 'auto', offset: 1 }}>
                            <Form>
                                <FormGroup>
                                    <Label for="Username">Användarnamn</Label>
                                    <Input valid={this.state.usernameValid} invalid={!this.state.usernameValid && (this.state.username || this.state.triedToSubmit)} type="text" id="username" placeholder="Karl pedal" value={this.state.username} onChange={e => this.changeUsername(e)} />
                                    <FormFeedback valid>Ditt namn är ledigt!</FormFeedback>
                                    <FormFeedback invalid>Aj, välj ett annan namn</FormFeedback>
                                    <FormText>Example help text that remains unchanged.</FormText>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input valid={this.state.emailValid} invalid={!this.state.emailValid && (this.state.email || this.state.triedToSubmit)} type="text" id="email" placeholder="min E-adress" value={this.state.email} onChange={e => this.changeEmail(e)} />
                                    <FormFeedback valid>Godtjänt email adress</FormFeedback>
                                    <FormFeedback invalid>Ej giltig email adress</FormFeedback>
                                    <FormText>Example help text that remains unchanged.</FormText>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Lösenord</Label>
                                    <Input valid={this.state.passwordValid} invalid={!this.state.passwordValid && (this.state.password || this.state.triedToSubmit)}  type="password" id="password" placeholder="Lösenord" value={this.state.password} onChange={e => this.changePassword(e)} />
                                    <FormFeedback valid>Ok lösenord</FormFeedback>
                                    <FormFeedback invalid>Minst 6 tecken</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="passwordCheck">Skriv lösenordet igen</Label>
                                    <Input valid={this.state.passwordCheckValid && this.state.passwordCheck} invalid={!this.state.passwordCheckValid && (this.state.passwordCheck || this.state.triedToSubmit)}  type="password" id="passwordCheck" placeholder="Upprepa lösenord" value={this.state.passwordCheck} onChange={e => this.changePasswordCheck(e)} />
                                    <FormFeedback valid>Lösenorden stämmer överrens.</FormFeedback>
                                    <FormFeedback invalid>Lösenorden stämmer inte överrens</FormFeedback>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                    <Col sm="12" md={{ size: 12, offset: 4 }}>
                        <Button color="primary" size="lg" onClick={()=>this.handleSubmit()}>Skapa användare</Button>
                    </Col>
                    <hr />
                    <hr />
                </Container>
            </div>
        );
    }
}

export default RegisterUser;