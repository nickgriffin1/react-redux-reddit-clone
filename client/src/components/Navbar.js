import React, { Component } from 'react'
import { Nav, Navbar, NavItem, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class SmredditNavbar extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>Smreddit</Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem>
              <Link to='/'>
                <Glyphicon glyph="home" /> Home
              </Link>
            </NavItem>
            <NavItem>
              <Link to='/categories'>
                <Glyphicon glyph="list" /> Categories
              </Link>
            </NavItem>
            <NavItem>
              <Link to='/add'>
                <Glyphicon glyph="plus" /> Add
              </Link>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default SmredditNavbar
