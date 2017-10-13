export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'

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

export function deletePost ({ postId }) {
  return {
    type: DELETE_POST,
    postId
  }
}
