export const GET_POSTS = 'GET_POSTS'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const VOTE_POST = 'VOTE_POST'

export const GET_CATEGORIES = 'GET_CATEGORIES'

export const GET_COMMENTS = 'GET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'

// Posts
export function getPosts({ posts }) {
  return {
    type: GET_POSTS,
    posts
  }
}

export function addPost({ postId, title, body, author, category, time }) {
  return {
    type: ADD_POST,
    postId,
    title,
    body,
    author,
    category,
    time
  }
}

export function deletePost({ postId }) {
  return {
    type: DELETE_POST,
    postId
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
    type: GET_CATEGORIES,
    categories
  }
}

// Comments
export function getComments({ comments }) {
  return {
    type: GET_COMMENTS,
    comments
  }
}

export function addComment({ comment }) {
  return {
    type: ADD_COMMENT,
    comment
  }
}
