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
                        {/* <Col xs="12" md="3" lg="3">
                            <h3 className="topinfobar d-none d-xs-none d-md-block d-lg-block">Aktiva användare</h3>
                        </Col> */}
                        <Col xs="12" md="6" lg="6">
                            <h3 className="topinfobar d-none d-xs-none d-md-none d-lg-block">{this.props.room}</h3>
                        </Col>
                        {/* <Col xs="12" md="3" lg="3">
                            <h3 className="topinfobar d-none d-xs-none d-md-block d-lg-block">Mina Chatt-rum</h3>
                        </Col> */}
                    </Row>
                </Container>
            </div>
        );
    }
}
