import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './Topinfobar.scss';

export default class Topinfobar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            någotfyndugtkommerhärsen: '',
        }
    }

    render() {
        return (
            <div>
                <Container fluid>
                    <Row>
                        <Col xs="3">
                            <h3 className="topinfobar">Aktiva användare</h3>
                        </Col>
                        <Col>
                            <h3 className="topinfobar">Gemensam chatt</h3>
                        </Col> 
                        <Col xs="3">
                            <h3 className="topinfobar">Mina Chatt-rum</h3>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
