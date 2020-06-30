import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

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
    ? <div type="submit" onClick={this.clickHandler}>Logout</div>
    : <Redirect to="/"/>
    )
  }
}

export default Logout;
