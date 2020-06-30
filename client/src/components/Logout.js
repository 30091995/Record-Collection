import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Button from 'react-bootstrap/Button';

class Logout extends Component {

  state = {
    redirect: false,
  };

  clickHandler = () => {
    axios.post("/api/logout").then(() => {
      this.props.logoutUser()
      this.setState({
        redirect: true
      })
    })
  }

  render() {
    return (
    !this.state.redirect 
    ? <Button variant="primary" type="submit" onClick={this.clickHandler}>Logout</Button>
    : <Redirect to="/"/>
    )
  }
}

export default Logout;
