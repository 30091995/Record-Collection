import React from "react";
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
    <Navbar sticky="top" expand="md" bg="white">
      <Navbar.Brand href="/profile">Record Stuff</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/searchArtist">Search for a Record</Nav.Link>
          <Nav.Link href="/">Scan a Record</Nav.Link>
        </Nav>
        <Nav>
          <Navbar.Text className="d-none d-md-inline">Signed in as: {props.user.username}</Navbar.Text>
          <Nav.Link href="/" onClick={clickHandler}>
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
