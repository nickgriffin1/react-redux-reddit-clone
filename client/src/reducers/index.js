import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {
  getPosts,
  getCategories
} from '../utils/api'
import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  VOTE_POST,

  GET_CATEGORIES,

  GET_COMMENTS,
  ADD_COMMENT,
} from '../actions'

//set intial post state to the posts retrieved from server
var initialPostsState = {}
getPosts().then((posts) => { initialPostsState = posts })

function posts(state = initialPostsState, action) {
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

//set intial categories state to the posts retrieved from server
var initialCommentsState = {}
//getAllComments().then((comments) => { initialCommentsState = comments })

function comments(state = initialCommentsState, action) {
  switch(action.type) {
    case GET_COMMENTS:
      return {
        
      }
    case ADD_COMMENT:
      return {
        ...state,
        comments: [
          ...state.comments,
          action.comment
        ]
      }
    default:
      return state
  }
}

//set intial categories state to the posts retrieved from server
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

// TODO create functionality for users
var initialUsersState = {}
function users(state = initialUsersState, action) {
  switch(action.type) {
    default:
      return state
  }
}

export default combineReducers({
  posts,
  comments,
  categories,
  users,
  router: routerReducer
})
