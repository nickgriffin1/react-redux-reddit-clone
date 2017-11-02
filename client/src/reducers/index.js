import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {
  SET_POSTS,
  ADD_POST,
  DELETE_POST,
  UP_VOTE_POST,
  DOWN_VOTE_POST,
  EDIT_POST,

  SET_CATEGORIES,

  SET_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  UP_VOTE_COMMENT,
  DOWN_VOTE_COMMENT,
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
      console.log('reached reducers')
      console.log('action', action)
      return [
        ...state,
        action.post
      ]
    case DELETE_POST:
      return [
        state.posts.filter(post => post.postId !== action.postId)
      ]
    case UP_VOTE_POST:
      const currentPost = state.filter(post => post.id === action.postId)[0]
      currentPost.voteScore = currentPost.voteScore + 1
      currentPost.hasVoted = true
      return [
        ...state.filter(post => post.id !== action.postId),
        currentPost
      ]
    case DOWN_VOTE_POST:
      const curPost = state.filter(post => post.id === action.postId)[0]
      curPost.voteScore = curPost.voteScore - 1
      curPost.hasVoted = true
      return [
        ...state.filter(post => post.id !== action.postId),
        curPost
      ]
    case EDIT_POST:
      return [
        ...state.filter(post => post.id !== action.postId),
        action.post
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
      return {
        ...state,
        [postId]: comments
      }
    case ADD_COMMENT:
      return {
        ...state,
        [action.postId]: [
          ...state[action.postId],
          action.comment
        ]
      }
    case DELETE_COMMENT:
      let activeComment = state[action.postId]
        .filter((comment) => comment.id === action.commentId)[0]
      activeComment.deleted = true
      return {
        ...state,
        [action.commentId]: {
          ...state[action.commentId].filter(comment => comment !== action.commentId),
          activeComment
        }
      }
    case UP_VOTE_COMMENT:
      activeComment = state[action.postId]
        .filter((comment) => comment.id === action.commentId)[0]
      activeComment.voteScore = activeComment.voteScore + 1
      activeComment.hasVoted = true
      return {
        ...state,
        [action.postId]: [
          ...state[action.postId].filter((comment) => comment.id !== action.commentId),
          activeComment
        ]
      }
    case DOWN_VOTE_COMMENT:
      activeComment = state[action.postId]
        .filter((comment) => comment.id === action.commentId)[0]
      activeComment.voteScore = activeComment.voteScore - 1
      activeComment.hasVoted = true
      return {
        ...state,
        [action.postId]: [
          ...state[action.postId].filter((comment) => comment.id !== action.commentId),
          activeComment
        ]
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
