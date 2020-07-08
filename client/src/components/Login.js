import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import "./Login.css";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText,
} from "reactstrap";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: null,
    redirect: false,
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/profile" />;
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const email = this.state.email;
    const password = this.state.password;

    axios
      .post("/api/login", { email, password })
      // 2xx status code
      .then((resp) => {
        this.props.updateUser(resp.data);
        this.setState({ email: "", password: "", redirect: true });
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.response.data.message,
        });
      });
  };

  render() {
    let loginForm = (
      <Row className="h-100 align-items-center justify-content-center loginFadeIn">
      <Col xs="10" sm="6">
        <Form onSubmit={this.handleSubmit}>
          <FormText className="my-4">
              <h2>Login</h2>
            </FormText>
            <br></br>

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
            <Button outline inverted color="info" type="submit" className="my-2">
              Login
            </Button>
          </FormGroup>

          <FormText>Not signed up yet? <Link to="/signup" className="text-info">Signup here</Link>.

          </FormText>

        </Form>
        </Col>
      </Row>
    );

    return (
      <Container fluid className="loginFullHeight">
        {this.renderRedirect()}
        {this.state.errorMessage ? <h1>{this.state.errorMessage}</h1> : null}
        {loginForm}
      </Container>
    );
  }
}

export default Login;
