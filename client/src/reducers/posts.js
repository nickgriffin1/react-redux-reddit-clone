import {
  RECEIVE_POSTS,
  ADD_POST,
  DELETE_POST,
  UP_VOTE_POST,
  DOWN_VOTE_POST,
  EDIT_POST,
} from '../actions'

var initialPostsState = []
export function posts(state = initialPostsState, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return [ ...action.posts ]
    case ADD_POST:
      return [
        ...state,
        action.post
      ]
    case DELETE_POST:
      var deletedPost = state.filter(post => post.id === action.postId)[0]
      deletedPost.deleted = true
      return [
        ...state.filter(post => post.id !== action.postId),
        deletedPost
      ]
    case UP_VOTE_POST:
      var currentPost = state.filter(post => post.id === action.postId)[0]
      currentPost.voteScore = currentPost.voteScore + 1
      currentPost.hasVoted = true
      return [
        ...state.filter(post => post.id !== action.postId),
        currentPost
      ]
    case DOWN_VOTE_POST:
      var curPost = state.filter(post => post.id === action.postId)[0]
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
