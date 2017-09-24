import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost } from './actions/index'
import { getCategories } from './utils/api'
import MyNavbar from './components/Navbar'
import MainView from './components/MainView'

class App extends Component {
  state = {
    categories: []
  }
  
  componentDidMount() {
    Promise.resolve(getCategories()).then((categories) => {
      this.setState({ ...categories })
    })
  }

  render() {
    return (
      <div className="App">
        <MyNavbar/>
        <MainView></MainView>
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    add: (data) => dispatch(addPost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
