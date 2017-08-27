export function getPosts () {
  const headers = {
    method: 'GET',
    'Authorization': 'the answer is 42'
  }
  return fetch(`http://localhost:5001/posts`, { headers: headers })
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
  return fetch(`http://localhost:5001/categories`, { headers: headers })
    .then((res) => res.json())
    .then((categories) => { return categories })
    .catch((e) => {
      console.log("Error in fetchPost", e)
    })
}
