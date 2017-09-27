import React, { Component } from 'react'
import { Nav, Navbar, NavItem, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class SmredditNavbar extends Component {
  state = {
    routes: [
      {
        name: 'Home',
        route: '/',
        glyph: 'home'
      },
      {
        name: 'Categories',
        route: '/categories',
        glyph: 'list'
      },
      {
        name: 'Add/Edit',
        route: '/add',
        glyph: 'plus'
      }
    ],
    route: '/'
  }
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>Smreddit</Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {this.state.routes.map((item, index) => (
              <NavItem
                key={index}
                className={this.state.route === item.route ? 'nav-item nav-item-active' : 'nav-item'}
              >
                <Link
                  className='navbar-link' to={item.route}
                  onClick={() => this.setState({ route: item.route })}
                > 
                  <Glyphicon glyph={item.glyph} /> {item.name}
                </Link>
              </NavItem>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default SmredditNavbar
