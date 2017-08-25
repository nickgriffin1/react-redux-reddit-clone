import React, { Component } from 'react'
import SmredditNavbar from './Navbar'
import MainView from './MainView'

class App extends Component {
  render() {
    return (
      <div className="App">
        <SmredditNavbar/>
        <MainView></MainView>
      </div>
    );
  }
}

export default App
