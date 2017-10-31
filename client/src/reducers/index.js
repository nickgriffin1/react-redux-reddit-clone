import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {
  SET_POSTS,
  ADD_POST,
  DELETE_POST,
  VOTE_POST,
  EDIT_POST,

  SET_CATEGORIES,

  SET_COMMENTS,
  GET_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT,
  EDIT_COMMENT,
} from '../actions'

var initialPostsState = []
function posts(state = initialPostsState, action) {
  switch (action.type) {
    case SET_POSTS:
      return [
        ...action.posts
      ]
    case ADD_POST:
      return [
        ...state,
        action.post
      ]
    case DELETE_POST:
      return [
        state.posts.filter((post) => {
          return post.postId !== action.postId
        })
      ]
    case VOTE_POST:
      return [
        ...state,

      ]
    case EDIT_POST:
      return [
        ...state
      ]
    default:
      return state
  }
}

var initialCategoriesState = []
function categories(state = initialCategoriesState, action) {
  // TODO create functionality for creating categories
  switch(action.type) {
    case SET_CATEGORIES:
      console.log('action', action)
      return [
        ...state,
        ...action.categories
      ]
    default:
      return state
  }
}

var initialCommentsState = {}
function comments(state = initialCommentsState, action) {
  const { comments, postId } = action
  switch(action.type) {
    case SET_COMMENTS:
      console.log(action)
      return {
        ...state,
        [postId]: comments
      }
    case GET_COMMENTS:
      return {
        ...state
      }
    case ADD_COMMENT:
      return {
        ...state,
        comments: [
          ...state.comments,
          action.comment
        ]
      }
    case DELETE_COMMENT:
      console.log(action.commentId)
      console.log('state[action.commentId]', ...state[action.commentId])
      return {
        ...state,
        [action.commentId]: {
          ...state.comments,

        }
      }
    case VOTE_COMMENT:
      return {
        ...state
      }
    case EDIT_COMMENT:
      return {
        ...state
      }
    default:
      return state
  }
}

// TODO create functionality for users
var initialUsersState = {}
function users(state = initialUsersState, action) {
  switch(action.type) {
    default:
      return {
        ...state
      }
  }
}

export default combineReducers({
  posts,
  comments,
  categories,
  users,
  router: routerReducer
})
