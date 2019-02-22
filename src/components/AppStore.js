import ActionTypes from '../ActionTypes'
import { EventEmitter } from 'events'
import dispatcher from '../Dispatcher'

import users from '../Fixtures'
import { findWithAttribute } from '../Utils'
import LoginStates from '../LoginStates'

class AppStore extends EventEmitter {
  constructor () {
    super()
    this.account = null
    this.loggedInState = LoginStates.noInput
    this.dialogText = 'Please input your user information below.'
  }

  getState () {
    return {
      account: this.account,
      loggedInState: this.loggedInState,
      dialogText: this.dialogText
    }
  }

  createAccount (account) {
    users.push(account)
  }

  authorize (account) {
    const index = findWithAttribute(users, 'username', account.username)
    const result = {}
    if (!isNaN(index)) {
      if (users[index].password === account.password) {
        result.account = account
        result.loggedInState = LoginStates.loggedIn
        result.dialogText = 'Logged in!'
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
        this.createAccount(action.value)
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
        this.account = null
        this.dialogText = 'Please input your user information below.'
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
