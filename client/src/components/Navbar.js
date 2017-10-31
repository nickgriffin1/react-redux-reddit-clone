import React, { Component } from 'react'
import { connect } from 'react-redux'
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

  setUnderline = (itemRoute) => {
    const route = this.props.router.location.pathname
    if (route === itemRoute) {
      return 'navbar-link nav-item-active'
    } else {
      return 'navbar-link'
    }
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Collapse>
          {this.state.routes.map((item, index) => (
              <NavLink
                key={index}
                className={this.setUnderline(item.route)}
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

function mapStateToProps ({ router }) {
  return {
    router,
  }
}

export default connect(mapStateToProps)(SmredditNavbar)
