import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import "./Signup.css";
import {
  Container,
  Row,
  Alert,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText,
} from "reactstrap";
// import { response } from "express";

class Signup extends Component {

  state = {
    email: "",
    password: "",
    username: "",
    fullname: "",
    error: null,
    verifyMessage: null,
  };

  // for error alert
  onDismiss = () => {
    this.setState({
      error: null,
      verifyMessage: null,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = (event) => {
    
    event.preventDefault();

    const email = this.state.email;
    const password = this.state.password;
    const username = this.state.username;
    const fullname = this.state.fullname;

    axios
      .post("/api/signup", { email, password, username, fullname })
      .then((resp) => {

        this.props.updateUser(resp.data);


        this.setState({
          email: "",
          password: "",
          username: "",
          fullname: "",
          verifyMessage: "Please verify the email we just sent you",
        });
      })
      .catch((err) => {
        if (err.response.data !== null) {
          this.setState({
            error: err.response.data.message,
          });
        }
      });
  };

  render() {
    let signupForm = (
      <Row className="h-100 align-items-center justify-content-center signupFadeIn">
        <Col xs="auto" md="4">
          <Form onSubmit={this.handleFormSubmit}>
            <FormText className="my-4">
              <h2 className="h2">
                <span>Signup</span>
              </h2>
            </FormText>

             {this.state.error && 
              <Alert toggle={this.onDismiss} color="danger">
                {this.state.error}
              </Alert>}

              {this.state.verifyMessage && 
              <Alert toggle={this.onDismiss} color="info">
                {this.state.verifyMessage}
              </Alert>}

            <FormGroup>
              <Label className="text-info">E-mail</Label>
              <Input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label className="text-info">Password</Label>
              <Input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label className="text-info">Username</Label>
              <Input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label className="text-info">Full Name</Label>
              <Input
                type="text"
                name="fullname"
                value={this.state.fullname}
                onChange={this.handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Button
                outline
                color="info"
                value="signup"
                type="submit"
                className="my-2"
              >
                Signup
              </Button>
            </FormGroup>

            <FormText>
              Already signed up?{" "}
              <Link to="/login" className="text-info">
                Login here
              </Link>
              .
            </FormText>
          </Form>
        </Col>
      </Row>
    );

    return (
      <Container fluid className="signupFullHeight">
        {signupForm}
      </Container>
    );
  }
}

export default Signup;
