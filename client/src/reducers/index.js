import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {
  getPosts,
  getCategories,
  getPostComments
} from '../utils/api'
import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  VOTE_POST,
  EDIT_POST,

  GET_CATEGORIES,

  GET_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT,
  EDIT_COMMENT,
} from '../actions'

//set intial post state to the posts retrieved from server
var initialPostsState = {}
getPosts().then((posts) => { initialPostsState = posts })

function posts(state = getPosts().then((posts) => posts), action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state
      }
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
    case VOTE_POST:
      return {
        ...state
      }
    case EDIT_POST:
      return {
        ...state
      }
    default:
      return state
  }
}

// set intial categories state to the posts retrieved from server
var initialCategoriesState = {}
getCategories().then((categories) => { initialCategoriesState = categories })

function categories(state = initialCategoriesState, action) {
  // TODO create functionality for creating categories
  switch(action.type) {
    case GET_CATEGORIES:
      return action.categories.map((category) => (category.name))
    default:
      return state
  }
}

//set intial categories state to the posts retrieved from server
var initialCommentsState = {}
//getAllComments().then((comments) => { initialCommentsState = comments })
function comments(state = initialCommentsState, action) {
  switch(action.type) {
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
      console.log('hit')
      console.log(state)
      return {
        ...state
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
  router: routerReducer
})
