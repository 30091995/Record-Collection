import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import './Signup.css'
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


class Signup extends Component {
  state = {
    email: "",
    password: "",
    username: "",
    fullname: "",
    redirect: false,
    error: null
  };

  // you can use for every input field
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
          redirect: true,
        });
      })
      .catch((err) => {
        if(err.response.data !== null)
        {
          this.setState({
            error: err.response.data.message
          })
        }
      })
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/verify-email" />;
    }
  };

  render() {

    let signupForm = (
    <Row className="h-100 align-items-center justify-content-center signupFadeIn">
      <Col xs="10" sm="6">
      <Form onSubmit={this.handleFormSubmit}>
        <FormText className="my-4">
          <h2>Signup</h2>
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
            <Button outline inverted color="info" value="signup" type="submit" className="my-2">
              Signup
            </Button>
          </FormGroup>

          <FormText>Already signed up? <Link to="/login" className="text-info">Login here</Link>.
          </FormText>

      </Form>
      </Col>
    </Row>
    )

    return (
      <Container fluid className="signupFullHeight">
        {this.state.error ? <h1>{this.state.error}</h1> : ""}
      {this.renderRedirect()}
      {signupForm}
    </Container>


      // <div>
      //   <div>
      //     {this.renderRedirect()}
      //     <form onSubmit={this.handleFormSubmit}>
      //       <div>
      //         <h2>Signup</h2>
      //       </div>

      //       <hr></hr>

      //       <div>
      //         <label>E-mail</label>
      //         <input
      //           type="text"
      //           name="email"
      //           value={this.state.email}
      //           onChange={this.handleChange}
      //           required
      //         />
      //       </div>

      //       <div>
      //         <label>Password</label>
      //         <input
      //           type="password"
      //           name="password"
      //           value={this.state.password}
      //           onChange={this.handleChange}
      //           required
      //         />
      //         <small id="emailHelp">Please choose more than 6 characters</small>
      //       </div>

      //       <div>
      //         <label>Username</label>
      //         <input
      //           type="text"
      //           name="username"
      //           value={this.state.username}
      //           onChange={this.handleChange}
      //         />
      //       </div>

      //       <div>
      //         <label>Full Name</label>
      //         <input
      //           type="text"
      //           name="fullname"
      //           value={this.state.fullname}
      //           onChange={this.handleChange}
      //         />
      //       </div>
      //       <div>
      //         <button type="submit" value="Signup">
      //           Submit
      //         </button>
      //       </div>
      //     </form>
      //   </div>
      // </div>
    );
  }
}

export default Signup;
