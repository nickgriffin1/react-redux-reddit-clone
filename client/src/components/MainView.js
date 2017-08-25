import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListView from './ListView'
import CategoryView from './CategoryView'
import AddView from './AddView'

class MainView extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={ListView} />
        <Route exact path='/categories' component={CategoryView} />
        <Route exact path='/add' component={AddView} />
      </div>
    )
  }
}

export default MainView
