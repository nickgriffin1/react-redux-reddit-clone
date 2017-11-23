const url = 'localhost'
const port = '3001'
const prefix = 'http://' + url + ':' + port

export function getPostsApi() {
  const obj = {
    'method': 'GET',
    'headers': {
      'Authorization': 'the-answer-is-42',
      'Content-Type': 'application/json'
    }
  }
  return fetch(prefix + `/posts`, obj)
    .then(res => res.json())
    .then(posts => posts)
    .catch((e) => {
      console.log('Error in getPosts', e)
    })
}

export function editPostApi(post) {
  console.log('editpost', post)
  const data = {
    title: post.title,
    body: post.body
  }
  console.log('data', data)
  const obj = {
    'method': 'PUT',
    'body': JSON.stringify(data),
    'headers': {
      'Authorization': 'the-answer-is-42'
    }
  }
  console.log('obj', obj)
  return fetch(prefix + `/posts/` + post.id, obj)
    .then(res => res.json())
    .catch(e => {
      console.log('Error in getPosts', e)
    })
}

export function getPostCommentsApi(id) {
  const obj = {
    'method': 'GET',
    'headers': {
      'Authorization': 'the-answer-is-42',
      'Content-Type': 'application/json'
    }
  }
  return fetch(prefix + `/posts/` + id + `/comments`, obj)
    .then(res => res.json())
    .then(posts => posts)
    .catch((e) => {
      console.log('Error in getPostComments', e)
    })
}


export function votePostApi(id, type) {
  const data = {
    option: type
  }
  const obj = {
    'method': 'POST',
    'body': JSON.stringify(data),
    'headers': {
      'Authorization': 'the-answer-is-42',
      'Content-Type': 'application/json'
    }
  }
  return fetch(prefix + `/posts/` + id, obj)
    .then(res => res.json())
    .catch(e => {
      console.log('Error in votePost', e)
    })
}

// TODO figure this out
export function deletePostApi(id) {
  const obj = {
    'method': 'DELETE',
    'headers': {
      'Authorization': 'the-answer-is-42',
      'Content-Type': 'application/json'
    }
  }
  return fetch(prefix + `/posts/` + id, obj)
    .then(res => res.json())
    .catch(e => {
      console.log('Error in deletePost', e)
    })
}

export function addPostApi(post) {
  const data = {
    id: post.id,
    timestamp: post.timestamp,
    title: post.title,
    body: post.body,
    author: post.author,
    category: post.category
  }
  const obj = {
    'method': 'POST',
    'body': JSON.stringify(data),
    'headers': {
      'Authorization': 'the-answer-is-42',
      'Content-Type': 'application/json'
    }
  }
  return fetch(prefix + `/posts`, obj)
    .then(res => res.json())
    .catch(e => {
      console.log('Error in addPost', e)
    })
}

export function getCategoriesApi() {
  const obj = {
    'method': 'GET',
    'headers': {
      'Authorization': 'the-answer-is-42',
      'Content-Type': 'application/json'
    }
  }
  return fetch(prefix + `/categories`, obj)
    .then((res) => res.json())
    .then((data) => data.categories)
    .catch(e => {
      console.log('Error in getCategoriesApi', e)
    })
}

export function addCommentApi(comment) {
  const data = {
    id: comment.id,
    timestamp: comment.timestamp,
    body: comment.body,
    author: comment.author,
    parentId: comment.parentId
  }
  const obj = {
    'method': 'POST',
    'body': JSON.stringify(data),
    'headers': {
      'Authorization': 'the-answer-is-42',
      'Content-Type': 'application/json'
    }
  }
  return fetch(prefix + `/comments/`, obj)
    .then(res => res.json())
    .catch(e => {
      console.log('Error in addCommentApi', e)
    })
}

export function deleteCommentApi(commentId) {
  const obj = {
    'method': 'DELETE',
    'headers': {
      'Authorization': 'the-answer-is-42',
      'Content-Type': 'application/json'
    }
  }
  return fetch(prefix + '/comments/' + commentId, obj)
    .then(res => res.json())
    .catch(e => {
      console.log('Error in deleteCommentApi', e)
    })
}

export function editCommentApi(comment) {
  const data = {
    timestamp: comment.timestamp,
    body: comment.body,
  }
  const obj = {
    'method': 'POST',
    'body': JSON.stringify(data),
    'headers': {
      'Authorization': 'the-answer-is-42',
      'Content-Type': 'application/json'
    }
  }
  return fetch(prefix + `/comments/` + comment.id, obj)
    .then(res => res.json())
    .catch(e => {
      console.log('Error in editCommentApi', e)
    })
}

export function voteCommentApi(commentId, type) {
  const data = {
    'option': type
  }
  const obj = {
    'method': 'POST',
    'body': JSON.stringify(data),
    'headers': {
      'Authorization': 'the-answer-is-42',
      'Content-Type': 'application/json',
    }
  }
  return fetch(prefix + `/comments/` + commentId, obj)
    .then(res => res.json())
    .catch(e => {
      console.log('Error in deleteCommentApi', e)
    })
}
