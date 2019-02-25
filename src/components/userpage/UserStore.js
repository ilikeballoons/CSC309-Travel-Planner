import ActionTypes from '../ActionTypes'
import { EventEmitter } from 'events'
import dispatcher from '../Dispatcher'

class UserStore extends EventEmitter {
  constructor () {
    super()
  }

  getState () {
    return {
      // some shit
    }
  }

  handleActions (action) {
    switch (action.type) {
      // shit
    }
  }
}

const userStore = new UserStore()
dispatcher.register(userStore.handleActions.bind(userStore))
export default userStore
