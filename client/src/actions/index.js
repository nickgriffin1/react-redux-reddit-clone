export const SET_POSTS = 'SET_POSTS'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const VOTE_POST = 'VOTE_POST'
export const EDIT_POST = 'EDIT_POST'

export const SET_CATEGORIES = 'SET_CATEGORIES'

export const SET_COMMENTS = 'SET_COMMENTS'
export const GET_COMMENTS = 'GET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
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

export function votePost({ postId, voteType }) {
  return {
    type: VOTE_POST,
    postId,
    voteType
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

export function addComment({ comment }) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function deleteComment({ commentId }) {
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
