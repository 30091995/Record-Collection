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
    <div>
      <Navbar color="faded" expand="md" light>
        <NavbarBrand href="/profile">Record Stuff</NavbarBrand>
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
              <NavbarText className="d-none d-md-inline mx-3 text-info">
                Signed in as: {props.user.username}
              </NavbarText>
            <NavItem>
              <NavLink href="/" onClick={clickHandler}>
                Logout
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
