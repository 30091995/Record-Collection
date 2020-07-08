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
      <Navbar color="light" expand="lg" light fixed="top" className="border-bottom border-faded rounded-bottom">
        <NavbarBrand href="/profile">Record Box</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav className="mr-auto" navbar>
          <NavItem>
              <NavLink href="/">Your Collection</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/searchArtist">Search for Artist</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/scan">Scan a Record</NavLink>
            </NavItem>
          </Nav>
          <Nav navbar>
              <NavbarText className="d-none d-lg-inline mx-3">Signed in as:
                <span className="text-info"> {props.user.username}</span>
              </NavbarText>
            <NavItem>
              <NavLink className="text-danger" href="/" onClick={clickHandler}>
                Logout
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
  );
}

export default NavigationBar;
