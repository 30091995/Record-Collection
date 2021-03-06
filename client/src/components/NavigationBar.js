import React, { useState } from "react";
import axios from "axios";
import {
  Collapse,
  Navbar,
  Button,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Row,
  Col,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";

function NavigationBar(props) {

  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  let clickHandler = () => {

    axios.post("/api/logout").then(() => {
      props.updateUser(null);
    });
  };

  let linkActive = { color: "#17a2b8" };

  return (


    <Navbar
      color="light"
      expand="lg"
      light
      fixed="top"
      className="border-bottom border-info shadow"
    >
      <NavbarBrand href="/profile">Record Box</NavbarBrand>
      <NavbarToggler onClick={toggleNavbar} className="mr-2" />
      <Collapse isOpen={!collapsed} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink
              tag={RRNavLink}
              onClick={setCollapsed}
              activeStyle={linkActive}
              to="/profile"
            >
              Your Collection
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={RRNavLink}
              onClick={setCollapsed}
              activeStyle={linkActive}
              to="/searchArtist"
            >
              Search for Artist
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={RRNavLink}
              onClick={setCollapsed}
              activeStyle={linkActive}
              to="/scan"
            >
              Scan a Record
            </NavLink>
          </NavItem>
        </Nav>
        <hr className="display-md-none"></hr>
        <Nav navbar>
          <NavbarText className="d-lg-inline mr-3">
            Signed in as:
            <span className="text-info"> {props.user.username}</span>
          </NavbarText>

          <NavItem>
          <Row>
          <Col xs="auto">
          <Button tag={NavLink} xs="auto" onClick={clickHandler} activeStyle={linkActive} color="white">
      Logout
          </Button>
          </Col>
          </Row>
            {/* <NavLink href="javascript:void(0);" onClick={clickHandler} activeStyle={linkActive}>
              Logout
            </NavLink> */}
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default NavigationBar;
