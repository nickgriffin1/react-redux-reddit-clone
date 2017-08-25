export const GET_POSTS = 'GET_POSTS'

export function getPosts ({ posts }) {
  return {
    type: GET_POSTS,
    posts
}
