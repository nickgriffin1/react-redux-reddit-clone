export const ADD_POST = 'ADD_POST'

export function addPost ({ posts }) {
  return {
    type: ADD_POST,
    posts
  }
}
