import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ListView from './ListView'
import CategoryView from './CategoryView'
import AddView from './AddView'
import NotFoundView from './NotFoundView'
import PostDetail from './PostDetail'

const MainView = function() {
  return (
    <div>
    	<Switch>
        <Route exact path='/' component={ListView} />
        <Route exact path='/categories' component={CategoryView} />
        <Route exact path='/add' component={AddView} />
        <Route exact path='/:category' render={({ match }) => (
        	<ListView filter={match.params.category} />
        )}/>
        <Route exact path='/:category/:post' render={({ match }) => (
          <PostDetail
            category={match.params.category}
            postId={match.params.post}
          />
        )}/>
        <Route exact path='/:category/:post/edit' render={({ match }) => (
          <AddView
            postId={match.params.post}
            mode='editing'
          />
        )}/>
        <Route component={NotFoundView} />
      </Switch>
    </div>
  )
}

export default MainView
