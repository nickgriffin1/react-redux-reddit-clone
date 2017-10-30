export const GET_POSTS = 'GET_POSTS'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const VOTE_POST = 'VOTE_POST'
export const EDIT_POST = 'EDIT_POST'

export const GET_CATEGORIES = 'GET_CATEGORIES'

export const SET_COMMENTS = 'SET_COMMENTS'
export const GET_COMMENTS = 'GET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'

// Posts
export function getPosts({ posts }) {
  return {
    type: GET_POSTS,
    posts
  }
}

export function addPost({ post }) {
  return {
    type: ADD_POST,
    post
  }
}

export function deletePost({ postId }) {
  return {
    type: DELETE_POST,
    postId
  }
}

export function editPost({ postId, post }) {
  return {
    type: EDIT_POST,
    postId,
    post
  }
}

export function votePost({ postId, voteType }) {
  return {
    type: VOTE_POST,
    postId,
    voteType
  }
}

// Categories
export function getCategories({ categories }) {
  return {
    type: GET_CATEGORIES
  }
}

// Comments
export function setComments({ comments }) {
  console.log('pure comments', comments)
  return {
    type: SET_COMMENTS,
    comments
  }
}

export function getComments({ comments }) {
  return {
    type: GET_COMMENTS
  }
}

export function addComment({ comment }) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function deleteComment({ commentId }) {
  console.log('trying to delete comment', commentId)
  return {
    type: DELETE_COMMENT,
    commentId
  }
}

export function voteComment({ commentId, voteType }) {
  return {
    type: VOTE_COMMENT,
    commentId,
    voteType
  }
}

export function editComment({ commentId, comment }) {
  return {
    type: EDIT_COMMENT,
    commentId,
    comment
  }
}
