import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { posts } from './posts'
import { comments } from './comments'
import { categories } from './categories'
import { users } from './users'

export default combineReducers({
  posts,
  comments,
  categories,
  users,
  router: routerReducer
})
