import React, { Component } from "react";
import axios from "axios";
import "./Signup.css";
import "bootstrap/dist/css/bootstrap.css";
// import '../../public/jake-noren-LJTlJ3MVYKM-unsplash.jpg'
import { Redirect } from "react-router-dom";

class Signup extends Component {
  state = {
    email: "",
    password: "",
    username: "",
    fullname: "",
    redirect: false,
  };

  // you can use for every input field
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/profile" />;
    }
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
      });
  };

  render() {
    return (
      <div className="row fullHeight justify-content-center">
        <div className="col col-md-8 align-self-center">
          {this.renderRedirect()}
          <form
            className="border rounded p-4 mx-4 mx-lg-5 signupForm bg-white shadow"
            onSubmit={this.handleFormSubmit}
          >
            <div className="form-group">
              <div className="h2">Signup</div>
            </div>

            <hr></hr>

            <div className="form-group">
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

            <div className="form-group">
              <label>Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
              <small id="emailHelp" className="form-text text-muted">
                Please choose more than 6 characters
              </small>
            </div>

            <div className="form-group">
              <label>Username</label>
              <input
                className="form-control"
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input
                className="form-control"
                type="text"
                name="fullname"
                value={this.state.fullname}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-dark" type="submit" value="Signup">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
