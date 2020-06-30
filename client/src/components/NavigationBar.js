import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

class NavigationBar extends Component {

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
      ? (<Navbar expand="lg">
        <Navbar.Brand href="#home">Record Stuff</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Add a Record</Nav.Link>
            <Nav.Link href="/">Scan a Record</Nav.Link>
            <Nav.Link onClick={this.clickHandler}>Logout</Nav.Link>
            <Nav.Link href="/">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>)
      : <Redirect to="/"></Redirect>
    );
  }
}

export default NavigationBar;
