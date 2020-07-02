import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import "./Start.css";

class Start extends Component {
  state = {};

  render() {
    return this.props.user ? (
      <div>
        You are already logged in, why don't you check out your{" "}
        <Link to="/profile">Profile</Link>?
      </div>
    ) : (
      <Row fluid className="startFullHeight">
        <Col sm="auto" className="align-self-center">
          <Row>
            <Col className="text-center">
              <h1 className="display-3 display-1-md text-white">RECORD BOX</h1>
            </Col>
          </Row>
          <Row className="text-center">
            <Col>
              <Link to="/signup">Signup</Link>
            </Col>
            <Col>
              <Link to="/login">Login</Link>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Start;
