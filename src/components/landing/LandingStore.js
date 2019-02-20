// Example for this type of file can be found at https://github.com/facebook/flux/blob/master/examples/flux-todomvc/src/data/TodoStore.js
import ActionTypes from '../../ActionTypes'
import { EventEmitter } from 'events'
import dispatcher from '../../Dispatcher'

class LandingStore extends EventEmitter {
  constructor () {
    super()
    this.open = false
    this.email = ''
    this.password = ''
  }

  getState () {
    return {
      open: this.open,
      email: this.email,
      password: this.password
    }
  }

  getOpenState () {
    return this.open
  }

  getEmail () {
    return this.email
  }

  getPassword () {
    return this.password
  }

  handleActions (action) {
    switch (action.type) {
      case ActionTypes.SIGNIN_DIALOG_OPEN: {
        this.open = true
        this.emit('change')
        break
      }

      case ActionTypes.SIGNIN_DIALOG_CLOSE: {
        this.open = false
        this.email = ''
        this.password = ''
        this.emit('change')
        break
      }

      case ActionTypes.SIGNIN_DIALOG_EMAIL_CHANGE: {
        this.email = action.value
        this.emit('change')
        break
      }

      case ActionTypes.SIGNIN_DIALOG_PASSWORD_CHANGE: {
        this.password = action.value
        this.emit('change')
        break
      }
      
      default:
    }
  }
}

const landingStore = new LandingStore()
dispatcher.register(landingStore.handleActions.bind(landingStore))
export default landingStore
