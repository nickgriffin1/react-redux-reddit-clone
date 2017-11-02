export const SET_POSTS = 'SET_POSTS'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const UP_VOTE_POST = 'UP_VOTE_POST'
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST'
export const EDIT_POST = 'EDIT_POST'

export const SET_CATEGORIES = 'SET_CATEGORIES'

export const SET_COMMENTS = 'SET_COMMENTS'
export const GET_COMMENTS = 'GET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT'
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMNMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'

// Posts
export function setPosts({ posts }) {
  return {
    type: SET_POSTS,
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

export function upVotePost({ postId }) {
  return {
    type: UP_VOTE_POST,
    postId
  }
}

export function downVotePost({ postId }) {
  return {
    type: DOWN_VOTE_POST,
    postId
  }
}

// Categories
export function setCategories({ categories }) {
  return {
    type: SET_CATEGORIES,
    categories
  }
}

// Comments
export function setComments({ postId, comments }) {
  return {
    type: SET_COMMENTS,
    postId,
    comments
  }
}

export function addComment({ postId, comment }) {
  return {
    type: ADD_COMMENT,
    postId,
    comment
  }
}

export function deleteComment({ postId, commentId }) {
  return {
    type: DELETE_COMMENT,
    postId,
    commentId
  }
}

export function upVoteComment({ postId, commentId }) {
  return {
    type: UP_VOTE_COMMENT,
    postId,
    commentId
  }
}

export function downVoteComment({ postId, commentId }) {
  return {
    type: DOWN_VOTE_COMMENT,
    postId,
    commentId
  }
}

export function editComment({ postId, comment }) {
  return {
    type: EDIT_COMMENT,
    postId,
    comment
  }
}
