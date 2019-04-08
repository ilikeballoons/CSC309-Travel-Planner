import { EventEmitter } from 'events'
import dispatcher from '../utils/Dispatcher'
import ActionTypes from '../utils/ActionTypes'

// HOLDS ONLY THE USER!!!
class UserStore extends EventEmitter {
  constructor () {
    super()
    this.user = null
  }

  getState () {
    return {
      user: this.user
    }
  }

  handleActions (action) {
    switch (action.type) {
      case ActionTypes.UPDATE_USER: {
        delete action.value.status
        delete action.value.__v
        delete action.value._id
        this.user = action.value
        this.emit('change')
        break
      }

      default:
    }
  }
}

const userStore = new UserStore()
dispatcher.register(userStore.handleActions.bind(userStore))
export default userStore
