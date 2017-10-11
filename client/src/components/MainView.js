import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import ListView from './ListView'
import CategoryView from './CategoryView'
import AddView from './AddView'
import NotFoundView from './NotFoundView'
import PostDetail from './PostDetail'

class MainView extends Component {
  render() {
    return (
      <div>
      	<Switch>
	        <Route exact path='/' component={ListView} />
	        <Route exact path='/categories' component={CategoryView} />
	        <Route path='/categories/:category' render={({ match }) => (
	        	<ListView filter={match.params.category} />
	        )}/>
	        <Route exact path='/add' component={AddView} />
	        <Route exact path='/posts/:post' render={({ match }) => (
            <PostDetail postId={match.params.post} />
          )}/>
          <Route exact path='/posts/:post/edit' render={({ match }) => (
            <AddView
              postId={match.params.post}
              title='title placeholder'
              body='body placeholder'
              author='author placeholder'
              category='React'
            />
          )}/>
	        <Route component={NotFoundView} />
	      </Switch>
	    </div>
    )
  }
}

export default MainView
