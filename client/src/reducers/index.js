import { combineReducers } from 'redux'
import {
  ADD_POST,
  DELETE_POST
} from '../actions'

function posts(state = {}, action) {
  console.log('action', action)
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [
          ...state.posts,
          {
            postId: action.postId,
            title: action.title,
            body: action.body,
            author: action.author,
            category: action.category,
            time: action.time
          }
        ]
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => {
          return post.postId !== action.postId
        })
      }
    default:
      return state
  }
}

function categories(state = {}, action) {
  // TODO create functionality for creating categories
  switch(action.type) {
    default:
      return state
  }
}

function users(state = {}, action) {
  // TODO create functionality for users
  switch(action.type) {
    default:
      return state
  }
}

export default combineReducers({
  posts,
  categories,
  users
})
