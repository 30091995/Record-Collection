import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import "./Start.css";

class Start extends Component {
  state = {};

  render() {
    return this.props.user ? (
      <div>
        <Redirect to="/profile"></Redirect>
      </div>
    ) : (
      <Container fluid className="startFullHeight">
        <Row className="h-100 align-items-center justify-content-center">
          <Col xs="10" md="auto" className="fadeIn text-center">
            <Col className="display-4 text-dark">RECORD BOX</Col>
            <Col className="h5 text-dark text-monospace my-4">
              Easily manage and track all your vinyl
            </Col>
            <Row className="my-4 justify-content-center">
              <Col xs="auto">
                <Link className="text-info" to="/login">
                  Login
                </Link>
              </Col>
              <Col xs="auto">
                <Link className="text-info" to="/signup">
                  Signup
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Start;
