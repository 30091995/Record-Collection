import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "./Login.css";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: "",
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
        console.log("ERROR !!");
        console.log(error.response);
        this.setState({
          errorMessage: error.response.data.message,
        });
      });
  };

  render() {
    return (
      <div className="row fullHeightLogin justify-content-center">
        <div className="col col-md-8 align-self-center">
          {this.renderRedirect()}
          {this.state.errorMessage ? <h1>{this.state.errorMessage}</h1> : null}
          <form
            onSubmit={this.handleSubmit}
            className="border rounded p-4 mx-4 mx-lg-5 loginForm bg-white shadow"
            noValidate
          >
            <div className="form-group">
              <div className="h2">Login</div>
            </div>

            <hr></hr>

            <div className="form-group">
              <div className="form-row">
                <div className="col">
                  <label>E-mail</label>
                  <input
                    className="form-control"
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                  />
                </div>

                <div className="col">
                  <label>Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-dark">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
