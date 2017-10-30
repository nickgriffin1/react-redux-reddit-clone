import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {
  getPosts,
  getCategories,
  getComments,
  getPostComments
} from '../utils/api'
import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  VOTE_POST,
  EDIT_POST,

  GET_CATEGORIES,

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
    case GET_POSTS:
      return {
        ...state
      }
    case ADD_POST:
      return {
        ...state,
        posts: [
          ...state.posts,
          action.post
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
        ...state,
        posts: [
          ...state.posts.map((post) => {
            if(post.postId !== action.postId) {
              return post
            } else {
              if (action.type === 'upvote') {
                post.voteScore = post.voteScore + 1
                return post
              } else if (action.type === 'downvote') {
                post.voteScore = post.voteScore - 1
                return post
              }
            }
          }),
          state.posts.filter((post) => {
            return post.postId === action.postId
          })
        ]
      }
    case EDIT_POST:
      return {
        ...state
      }
    default:
      return state
  }
}

var initialCategoriesState = []
function categories(state = initialCategoriesState, action) {
  // TODO create functionality for creating categories
  switch(action.type) {
    case GET_CATEGORIES:
      return action.categories.map((category) => (category.name))
    default:
      return state
  }
}

var initialCommentsState = []
function comments(state = initialCommentsState, action) {
  switch(action.type) {
    case SET_COMMENTS:
      console.log(action)
      return {
        ...state,
        comments: action.comments
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
      console.log('hit')
      console.log(state)
      return {
        ...state,
        comments: [
          state.comments.filter((comment) => { return comment !== action.commentId })
        ]
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
