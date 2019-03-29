const postUser = (user) => {
  return fetch ('/users', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  })
    .then((res) => res.status)
}

const getUser = (user) => {
  return fetch(`/users/${user.username}/${user.password}`)
    .then((res) => res)
}

const patchUser = (user) => {
  return fetch('/users', {
    method: 'PATCH',
    body: JSON.stringify(user),
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  })
    .then((res) => res.json()) // TODO: improve
    .then((res) => res)
}

const login = (user) => {
  // console.log(user);
  return fetch(`/users/login`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  })
    .then((res) => (
      res.json()
        .then((json) => ({ status: res.status, ...json }))
    ))
    .catch((err) => err)
}

const logout = () => {
  return fetch('/users/logout')
    .then((res) => res.status)
}

export { postUser, getUser, login, logout, patchUser }
