import { getPosts } from '../utils/api'

// Posts
// lines 12-54 modified verison of https://redux.js.org/docs/advanced/AsyncActions.html
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}

function fetchPosts() {
  return dispatch => {
    return getPosts().then(posts => dispatch(receivePosts(posts)))
  }
}

function shouldFetchPosts(state) {
  const posts = state.posts
  if (posts.length === 0) {
    return true
  } else {
    return false
  }
}

export function fetchPostsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState())) {
      return dispatch(fetchPosts())
    } else {
      return Promise.resolve()
    }
  }
}

export const ADD_POST = 'ADD_POST'
export function addPost({ post }) {
  return {
    type: ADD_POST,
    post
  }
}

export const DELETE_POST = 'DELETE_POST'
export function deletePost({ postId }) {
  return {
    type: DELETE_POST,
    postId
  }
}

export const EDIT_POST = 'EDIT_POST'
export function editPost({ postId, post }) {
  return {
    type: EDIT_POST,
    postId,
    post
  }
}

export const UP_VOTE_POST = 'UP_VOTE_POST'
export function upVotePost({ postId }) {
  return {
    type: UP_VOTE_POST,
    postId
  }
}

export const DOWN_VOTE_POST = 'DOWN_VOTE_POST'
export function downVotePost({ postId }) {
  return {
    type: DOWN_VOTE_POST,
    postId
  }
}

// Categories
export const SET_CATEGORIES = 'SET_CATEGORIES'
export function setCategories({ categories }) {
  return {
    type: SET_CATEGORIES,
    categories
  }
}

// Comments
export const SET_COMMENTS = 'SET_COMMENTS'
export function setComments({ postId, comments }) {
  return {
    type: SET_COMMENTS,
    postId,
    comments
  }
}

export const ADD_COMMENT = 'ADD_COMMENT'
export function addComment({ postId, comment }) {
  return {
    type: ADD_COMMENT,
    postId,
    comment
  }
}

export const DELETE_COMMENT = 'DELETE_COMMENT'
export function deleteComment({ postId, commentId }) {
  return {
    type: DELETE_COMMENT,
    postId,
    commentId
  }
}

export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT'
export function upVoteComment({ postId, commentId }) {
  return {
    type: UP_VOTE_COMMENT,
    postId,
    commentId
  }
}

export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMNMENT'
export function downVoteComment({ postId, commentId }) {
  return {
    type: DOWN_VOTE_COMMENT,
    postId,
    commentId
  }
}

export const EDIT_COMMENT = 'EDIT_COMMENT'
export function editComment({ postId, comment }) {
  return {
    type: EDIT_COMMENT,
    postId,
    comment
  }
}
