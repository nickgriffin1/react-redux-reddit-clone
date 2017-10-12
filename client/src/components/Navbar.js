import React, { Component } from 'react'
import { Navbar, Glyphicon } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

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

  componentDidUpdate() {
    console.log()
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Collapse>
          {this.state.routes.map((item, index) => (
              <NavLink
                key={index}
                className={this.state.route === item.route ? 'navbar-link nav-item-active' : 'navbar-link'}
                to={item.route}
                onClick={() => this.setState({ route: item.route })}
              >
                <Glyphicon glyph={item.glyph} /> {item.name}
              </NavLink>
          ))}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default SmredditNavbar
