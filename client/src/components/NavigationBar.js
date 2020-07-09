import React, { useState } from "react";
import axios from "axios";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";

function NavigationBar(props) {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  let clickHandler = () => {
    axios.post("/api/logout").then(() => {
      this.props.updateUser(null);
    });
  };

  return (
    <Navbar
      color="light"
      expand="lg"
      light
      fixed="top"
      className="border-bottom border-faded"
    >
      <NavbarBrand href="/profile">Record Box</NavbarBrand>
      <NavbarToggler onClick={toggleNavbar} className="mr-2" />
      <Collapse isOpen={!collapsed} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/profile">Your Collection</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/searchArtist">Search for Artist</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/scan">Scan a Record</NavLink>
          </NavItem>
        </Nav>
        <Nav navbar>
          <NavbarText>
            {props.user.verifiedEmail ? null : (
              <span className="badge badge-danger">
                Please verify your Email
              </span>
            )}
          </NavbarText>

          <NavbarText className="d-none d-lg-inline mx-3">
            Signed in as:
            <span className="text-info"> {props.user.username}</span>
          </NavbarText>

          <NavItem>
            <NavLink href="/" onClick={clickHandler}>
              Logout
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default NavigationBar;
