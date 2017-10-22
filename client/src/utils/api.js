const url = 'localhost'
const port = '3001'
const prefix = `http://` + url + `:` + port

export function getPosts() {
  const headers = {
    'method': 'GET',
    'Authorization': 'the answer is 42'
  }
  return fetch(prefix + `/posts`, { headers: headers })
    .then((res) => res.json())
    .then((posts) => { return posts })
    .catch((e) => {
      console.log("Error in fetchPost", e)
    })
}

export function getPost(id) {
  const headers = {
    'method': 'GET',
    'Authorization': 'the answer is 42'
  }
  return fetch(prefix + `/posts/` + id, { headers: headers })
    .then((res) => res.json())
    .then((posts) => { return posts })
    .catch((e) => {
      console.log("Error in fetchPost", e)
    })
}

export function getPostComments(id) {
  const headers = {
    'method': 'GET',
    'Authorization': 'the answer is 42'
  }
  return fetch(prefix + `/posts/` + id + `/comments`, { headers: headers })
    .then((res) => res.json())
    .then((posts) => { return posts })
    .catch((e) => {
      console.log("Error in fetchPost", e)
    })
}


export function votePost(id, type) {
  const headers = {
    'method': 'POST',
    'Authorization': 'the answer is 42',
    'option': type
  }
  return fetch(prefix + `/posts/` + id, { headers: headers })
    .then((res) => {res.json(); console.log(res)})
    .catch((e) => {
      console.log("Error in fetchPost", e)
    })
}

export function addPost(id, timestamp, title, body, author, category) {
  const headers = {
    'method': 'POST',
    'Authorization': 'the answer is 42',
    'id': id,
    'timestamp': timestamp,
    'title': title,
    'body': body,
    'author': author,
    'category': category
  }
  return fetch(prefix + `/posts`, { headers: headers })
    .then((res) => {res.json(); console.log(res)})
    .catch((e) => {
      console.log("Error in fetchPost", e)
    })
}

export function getCategories() {
  const headers = {
    'method': 'GET',
    'Authorization': 'the answer is 42'
  }
  return fetch(prefix + `/categories`, { headers: headers })
    .then((res) => res.json())
    .then((categories) => { return categories })
    .catch((e) => {
      console.log("Error in fetchPost", e)
    })
}

export function getCategory(category) {
  const headers = {
    'method': 'GET',
    'Authorization': 'the answer is 42'
  }
  return fetch(prefix + `/categories/` + category, { headers: headers })
    .then((res) => res.json())
    .then((category) => { return category })
    .catch((e) => {
      console.log("Error in fetchPost", e)
    })
}
