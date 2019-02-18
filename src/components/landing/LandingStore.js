// Example for this type of file can be found at https://github.com/facebook/flux/blob/master/examples/flux-todomvc/src/data/TodoStore.js
import Immutable from 'immutable'
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
        console.log('opened')
        this.open = true
        this.emit('storeUpdated')
        break
      }

      case ActionTypes.SIGNIN_DIALOG_CLOSE: {
        console.log('closed')
        this.open = false
        this.email = ''
        this.password = ''
        this.emit('storeUpdated')
        break
      }

      case ActionTypes.SIGNIN_DIALOG_EMAIL_CHANGE: {
        this.email = action.value
        this.emit('emailChanged')
        break
      }

      case ActionTypes.SIGNIN_DIALOG_PASSWORD_CHANGE: {
        this.password = action.value
        this.emit('passwordChanged')
        break
      }

      case ActionTypes.SIGNIN_DIALOG_SIGNIN_START: {
        console.log('logging in')
        console.log(action.value)
        break
      }

      default:
    }
  }
}

const landingStore = new LandingStore()
dispatcher.register(landingStore.handleActions.bind(landingStore))
export default landingStore
