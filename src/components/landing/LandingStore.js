// Example for this type of file can be found at https://github.com/facebook/flux/blob/master/examples/flux-todomvc/src/data/TodoStore.js
import ActionTypes from '../../ActionTypes'
import { EventEmitter } from 'events'
import dispatcher from '../../Dispatcher'

class LandingStore extends EventEmitter {
  constructor () {
    super()
    this.signin = {
      open: false,
      email: '',
      password: ''
    }

    this.createAccount = {
      open: false,
      username: '',
      password: '',
      birthday: '',
      fullName: ''
    }
  }

  getState () {
    return {
      createAccount: this.createAccount,
      signin: this.signin
    }
  }

  handleActions (action) {
    switch (action.type) {
      case ActionTypes.CREATE_ACCOUNT_OPEN: {
        this.createAccount.open = true
        this.emit('change')
        break
      }

      case ActionTypes.CREATE_ACCOUNT_CLOSE: {
        this.createAccount.open = false
        this.emit('change')
        break
      }

      case ActionTypes.SIGNIN_DIALOG_OPEN: {
        this.signin.open = true
        this.emit('change')
        break
      }

      case ActionTypes.SIGNIN_DIALOG_CANCEL: {
        this.signin = {
          open: false,
          email: '',
          password: ''
        }
        this.emit('change')
        break
      }

      case ActionTypes.SIGNIN_DIALOG_EMAIL_CHANGE: {
        this.signin.email = action.value
        this.emit('change')
        break
      }

      case ActionTypes.SIGNIN_DIALOG_PASSWORD_CHANGE: {
        this.signin.password = action.value
        this.emit('change')
        break
      }

      case ActionTypes.SIGNIN_DIALOG_SIGNIN_SUCCESS: {
        this.signin.open = false
        this.emit('change')
        break
      }

      case ActionTypes.SIGNOUT: {
        this.signin = {
          open: false,
          email: '',
          password: ''
        }
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
