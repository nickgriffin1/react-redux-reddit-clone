import React, { Component } from 'react'
import MyNavbar from './components/Navbar'
import MainView from './components/MainView'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <MyNavbar />
        <MainView />
      </div>
    );
  }
}

export default App
