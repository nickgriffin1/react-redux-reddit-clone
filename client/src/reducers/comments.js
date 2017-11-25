import {
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  UP_VOTE_COMMENT,
  DOWN_VOTE_COMMENT,
  EDIT_COMMENT,
} from '../actions'

var initialCommentsState = {}
export function comments(state = initialCommentsState, action) {
  const { comments, comment, commentId, postId } = action
  switch(action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        [postId]: comments
      }
    case ADD_COMMENT:
      return {
        ...state,
        [postId]: [
          ...state[postId],
          comment
        ]
      }
    case DELETE_COMMENT:
      var activeComment = state[postId]
        .filter((comment) => comment.id === commentId)[0]
      activeComment.deleted = true
      return {
        ...state,
        [postId]: [
          ...state[postId].filter(comment => comment.id !== action.commentId),
          activeComment
        ]
      }
    case UP_VOTE_COMMENT:
      activeComment = state[postId]
        .filter((comment) => comment.id === commentId)[0]
      activeComment.voteScore = activeComment.voteScore + 1
      activeComment.hasVoted = true
      return {
        ...state,
        [postId]: [
          ...state[postId].filter((comment) => comment.id !== commentId),
          activeComment
        ]
      }
    case DOWN_VOTE_COMMENT:
      activeComment = state[postId]
        .filter((comment) => comment.id === commentId)[0]
      activeComment.voteScore = activeComment.voteScore - 1
      activeComment.hasVoted = true
      return {
        ...state,
        [action.postId]: [
          ...state[action.postId].filter((comment) => comment.id !== commentId),
          activeComment
        ]
      }
    case EDIT_COMMENT:
      activeComment = state[postId]
        .filter((comment) => comment.id === action.comment.id)[0]
      return {
        ...state,
        [postId]: [
          ...state[postId].filter((comment) => comment.id !== action.comment.id),
          activeComment
        ]
      }
    default:
      return state
  }
}
