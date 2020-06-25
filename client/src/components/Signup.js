import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

class Signup extends Component {

  state = {
    email : '',
    password : '',
    username : '',
    fullname : '',
    redirect: false
  }

  // you can use for every input field
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/profile' />
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const email = this.state.email;
    const password = this.state.password;
    const username = this.state.username;
    const fullname = this.state.fullname

    axios.post("/api/signup", { email, password, username, fullname })
      .then((resp) => {
        this.props.updateUser(resp.data)
        this.setState({ email: "", password: "", username: "", fullname: "", redirect: true});
      })
  }

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <form onSubmit={this.handleFormSubmit}>
          <label>E-mail:</label>
          <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />

          <label>Password:</label>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />

          <label>Username: </label>
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />

          <label>Full name:</label>
          <input type="text" name="fullname" value={this.state.fullname} onChange={this.handleChange} />
          <input type="submit" value="Signup" />
        </form>
      </div>
    )
  }

}

export default Signup;