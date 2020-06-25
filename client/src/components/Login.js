import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class Login extends Component {

  state = {
    email : "",
    password : "",
    errorMessage : "",
    redirect: false
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/profile' />
    }
  }


  handleChange = (event) => {
    const {name , value} = event.target
    this.setState({
      [name] : value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const email = this.state.email;
    const password = this.state.password;
    
    axios.post("/api/login", { email, password })
    // 2xx status code
    .then((resp) => {
      this.props.updateUser(resp.data)
      this.setState({ email: "", password: "", redirect: true});

    }).catch((error) => {
      console.log("ERROR !!")
      console.log(error.response)
      this.setState({
        errorMessage: error.response.data.message
      })
    })
}

  render() {
    return(
      <div>
        {this.renderRedirect()}
        {this.state.errorMessage ? <h1>{this.state.errorMessage}</h1> : null}
        <form onSubmit={this.handleSubmit}>
          <label>E-mail :</label>
          <input type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
          <label>Password :</label>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default Login