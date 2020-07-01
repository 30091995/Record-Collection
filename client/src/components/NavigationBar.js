import React, { Component } from "react";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function NavigationBar(props) {
  let clickHandler = () => {
    axios.post("/api/logout").then(() => {
      this.props.updateUser(null);
    });
  };

  return (
    <Navbar expand="lg">
      <Navbar.Brand href="#home">Record Stuff</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/searchArtist">Add a Record</Nav.Link>
          <Nav.Link href="/">Scan a Record</Nav.Link>
          <Nav.Link href="/" onClick={clickHandler}>
            Logout
          </Nav.Link>
          <Nav.Link href="/">About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
