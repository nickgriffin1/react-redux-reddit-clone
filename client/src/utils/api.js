const url = 'localhost'
const port = '3001'

export function getPosts () {
  const headers = {
    method: 'GET',
    'Authorization': 'the answer is 42'
  }
  return fetch(`http://` + url + `:` + port + `/posts`, { headers: headers })
    .then((res) => res.json())
    .then((posts) => { return posts })
    .catch((e) => {
      console.log("Error in fetchPost", e)
    })
}

export function getCategories () {
  const headers = {
    method: 'GET',
    'Authorization': 'the answer is 42'
  }
  return fetch(`http://` + url + `:` + port + `/categories`, { headers: headers })
    .then((res) => res.json())
    .then((categories) => { return categories })
    .catch((e) => {
      console.log("Error in fetchPost", e)
    })
}

export function getCategory (category) {
  const headers = {
    method: 'GET',
    'Authorization': 'the answer is 42'
  }
  return fetch(`http://` + url + `:` + port + `/categories/` + category, { headers: headers })
    .then((res) => res.json())
    .then((category) => { return category })
    .catch((e) => {
      console.log("Error in fetchPost", e)
    })
}
