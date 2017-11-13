const url = 'localhost'
const port = '3001'
const prefix = 'http://' + url + ':' + port

export function getPostsApi() {
  const headers = {
    'method': 'GET',
    'Authorization': 'the-answer-is-42'
  }
  return fetch(prefix + `/posts`, { headers: headers })
    .then((res) => res.json())
    .then((posts) => { return posts })
    .catch((e) => {
      console.log('Error in getPosts', e)
    })
}

export function getPostApi(id) {
  const headers = {
    'method': 'GET',
    'Authorization': 'the-answer-is-42'
  }
  return fetch(prefix + `/posts/` + id, { headers: headers })
    .then((res) => res.json())
    .then((posts) => { return posts })
    .catch((e) => {
      console.log('Error in getPosts', e)
    })
}

export function getPostCommentsApi(id) {
  const headers = {
    'method': 'GET',
    'Authorization': 'the-answer-is-42'
  }
  return fetch(prefix + `/posts/` + id + `/comments`, { headers: headers })
    .then((res) => res.json())
    .then((posts) => { return posts })
    .catch((e) => {
      console.log('Error in getPostComments', e)
    })
}


export function votePostApi(id, type) {
  const headers = {
    'method': 'POST',
    'Authorization': 'the-answer-is-42',
    'option': type
  }
  return fetch(prefix + `/posts/` + id, { headers: headers })
    .then((res) => {res.json(); console.log(res)})
    .catch((e) => {
      console.log('Error in votePost', e)
    })
}

// TODO figure this out
export function deletePostApi(id) {
  const headers = {
    'method': 'DELETE',
    'Authorization': 'the-answer-is-42',
  }
  return fetch(prefix + `/posts/` + id, { headers: headers })
    .then((res) => {res.json(); console.log(res)})
    .catch((e) => {
      console.log('Error in deletePost', e)
    })
}

export function addPostApi(post) {
  console.log('adding post', post)
  const headers = {
    'method': 'POST',
    'Authorization': 'the-answer-is-42',
    'id': post.id,
    'timestamp': post.timestamp,
    'title': post.title,
    'body': post.body,
    'author': post.author,
    'category': post.category
  }
  return fetch(prefix + `/posts`, { headers: headers })
    .then((res) => {res.json(); console.log(res)})
    .catch((e) => {
      console.log('Error in addPost', e)
    })
}

export function getCategoriesApi() {
  const headers = {
    'method': 'GET',
    'Authorization': 'the-answer-is-42'
  }
  return fetch(prefix + `/categories`, { headers: headers })
    .then((res) => res.json())
    .then((data) => { return data.categories })
    .catch((e) => {
      console.log('Error in getCategoriesApi', e)
    })
}

export function addCommentApi(comment) {
  const obj = {
    method: 'POST',
    headers: {
      Authorization: 'the-answer-is-42',
      id: comment.id,
      timestamp: comment.timestamp,
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId
    }
  }
  return fetch(prefix + `/comments/`, obj)
    .then(res => res.json())
    .then(data => console.log('data', data))
    .catch(e => {
      console.log('Error in addCommentApi', e)
    })
}

export function deleteCommentApi(commentId) {
  const obj = {
    method: 'POST',
    headers: {
      'Authorization': 'the-answer-is-42',
    }
  }
  return fetch(prefix + `/comments/` + commentId, obj)
    .then(res => res.json())
    .catch(e => {
      console.log('Error in deleteCommentApi', e)
    })
}

export function editCommentApi(comment) {
  const obj = {
    method: 'POST',
    headers: {
      Authorization: 'the-answer-is-42',
      timestamp: comment.timestamp,
      body: comment.body,
    }
  }
  return fetch(prefix + `/comments/` + comment.id, obj)
    .then(res => res.json())
    .catch(e => {
      console.log('Error in editCommentApi', e)
    })
}

export function voteCommentApi(commentId, type) {
  const obj = {
    method: 'POST',
    headers: {
      Authorization: 'the-answer-is-42',
      option: type
    }
  }
  return fetch(prefix + `/comments/` + commentId, obj)
    .then(res => res.json())
    .catch(e => {
      console.log('Error in deleteCommentApi', e)
    })
}
