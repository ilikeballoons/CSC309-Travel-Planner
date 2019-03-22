import { EventEmitter } from 'events'
import dispatcher from '../utils/Dispatcher'

import ActionTypes from '../utils/ActionTypes'
import { users } from '../utils/Fixtures'
import { findWithAttribute } from '../utils/Utils'
import LoginStates from '../utils/LoginStates'

class AppStore extends EventEmitter {
  constructor () {
    super()
    this.user = null
    this.loggedInState = LoginStates.noInput
    this.dialogText = 'Please input your user information below.'
  }

  getState () {
    return {
      user: this.user,
      loggedInState: this.loggedInState,
      dialogText: this.dialogText
    }
  }

  authorize (credentials) {
    const index = findWithAttribute(users, 'username', credentials.username)
    const result = {}
    if (!isNaN(index)) {
      if (users[index].password === credentials.password) {
        result.loggedInState = LoginStates.loggedIn
        result.dialogText = 'Logged in!'
        result.user = users[index]
      } else {
        result.loggedInState = LoginStates.incorrectPassword
        result.dialogText = 'Incorrect password. Did you forget your password?'
      }
    } else {
      result.loggedInState = LoginStates.usernameNotFound
      result.dialogText = 'Username not found.'
    }
    return result
  }

  handleActions (action) {
    switch (action.type) {
      case ActionTypes.CREATE_ACCOUNT_SUBMIT: {
        users.push(action.value)
        this.emit('change')
        break
      }

      case ActionTypes.SIGNIN_DIALOG_SIGNIN_START: {
        Object.assign(this, this.authorize(action.value))
        this.emit('change')
        break
      }

      case ActionTypes.SIGNIN_DIALOG_SIGNIN_CANCEL: {
        this.loggedInState = LoginStates.noInput
        this.emit('change')
        break
      }

      case ActionTypes.SIGNOUT: {
        this.loggedInState = LoginStates.noInput
        this.user = null
        this.dialogText = 'Please input your user information below.'
        this.emit('change')
        break
      }

      case ActionTypes.USERPROFILE_EDIT: {
        const key = Object.keys(action.value)[0]
        this.user[key] = action.value[key]
        this.emit('change')
        break
      }

      case ActionTypes.USERPROFILE_DELETE_ACCOUNT: {
        const index = findWithAttribute(users, 'username', this.user.username)
        this.user = null
        this.loggedInState = LoginStates.noInput
        this.dialogText = 'Please input your user information below.'
        users.splice(index, 1)
        this.emit('change')
        break
      }

      default:
    }
  }
}

const appStore = new AppStore()
dispatcher.register(appStore.handleActions.bind(appStore))
export default appStore
