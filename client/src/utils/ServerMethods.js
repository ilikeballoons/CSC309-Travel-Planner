const postUser = (user) => {
  return fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if (!res.ok) return Promise.reject(res.statusText)
      return Promise.resolve(res.status)
    })
}

const deleteItinerary = (id) => {
  return fetch(`/api/users/itineraries/${id}`, {
    method: 'DELETE'
  })
    .then((res) => res.json()) // new user, itinerary that was removed
}

const patchItinerary = (id, name, events) => {
  return fetch(`/api/users/itineraries/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ name, events }),
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  })
    .then((res) => res.json())
}

const postItinerary = (itinerary) => {
  return fetch('/api/users/itineraries', {
    method: 'POST',
    body: JSON.stringify({ itinerary }),
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  })
    .then((res) => res.json())
    .then((res) => ({ itinerary: res.itineraries[res.itineraries.length - 1], length: res.itineraries.length - 1, user: res })) // return last itinerary (most recently saved itinerary)
}

const getUser = (user) => {
  return fetch(`/api/users/${user.username}/${user.password}`)
    .then((res) => res.json())
    .catch((error) => console.log(error))
}

const getAllUsers = () => {
  return fetch(`/api/users`)
    .then((res) => res.json())
    .catch((error) => console.log(error))
}

const getUsersByName = (queryString) => {
  return fetch(`/api/users/${queryString}`)
    .then((res) => res.json())
    .catch((error) => console.log(error))
}

const patchUser = (user) => {
  return fetch('/api/users', {
    method: 'PATCH',
    body: JSON.stringify(user),
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(error)
    })
}

const deleteUser = (user) => {
  return fetch('/api/users', {
    method: 'DELETE',
    body: (user && JSON.stringify(user)) || null,
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(error)
    })
}

const login = (user) => {
  return fetch(`/api/users/login`, {
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
}

const logout = () => {
  return fetch('/api/users/logout')
    .then((res) => res.status)
}

export { postUser, getUser, login, logout, patchUser, postItinerary, deleteItinerary, patchItinerary, getAllUsers, getUsersByName, deleteUser }
