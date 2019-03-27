const postUser = (user) => {
  return fetch ('/users', {
    method: 'post',
    body: JSON.stringify(user),
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  })
    .then((res) => res.status)
}

export { postUser }
