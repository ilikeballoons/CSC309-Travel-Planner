import ActionTypes from '../../utils/ActionTypes'
import { EventEmitter } from 'events'
import dispatcher from '../../utils/Dispatcher'

class SearchAppBarStore extends EventEmitter {
  constructor () {
    super()
    this.searchQuery = ''
    this.travelDate = new Date()
    this.signin = {
      open: false,
      username: '',
      password: ''
    }
    this.createAccount = {
      open: false,
      username: '',
      password: '',
      password2: '',
      birthday: null,
      fullName: '',
      hasClickedSubmit: false
    }
  }

  getState () {
    return {
      searchQuery: this.searchQuery,
      createAccount: this.createAccount,
      signin: this.signin,
      travelDate: this.travelDate
    }
  }

  handleActions (action) {
    switch (action.type) {
      case ActionTypes.CREATE_ACCOUNT_OPEN: {
        this.createAccount.open = true
        this.signin.open = false
        this.emit('change')
        break
      }

      case ActionTypes.CREATE_ACCOUNT_CANCEL: {
        this.createAccount.open = false
        this.createAccount.hasClickedSubmit = false
        this.emit('change')
        break
      }

      case ActionTypes.CREATE_ACCOUNT_CHANGE: {
        Object.assign(this.createAccount, action.value)
        this.emit('change')
        break
      }

      case ActionTypes.CREATE_ACCOUNT_CLICK_SUBMIT: {
        this.createAccount.hasClickedSubmit = true
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
          username: '',
          password: ''
        }
        this.emit('change')
        break
      }

      case ActionTypes.SIGNIN_DIALOG_EMAIL_CHANGE: {
        this.signin.username = action.value
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
          username: '',
          password: ''
        }
        this.emit('change')
        break
      }

      case ActionTypes.SEARCHBAR_CHANGE: {
        this.searchQuery = action.value
        this.emit('change')
        break
      }

      case ActionTypes.SEARCHBAR_SEARCH: {
        console.log('search! This will call an API in phase 2 ', action)
        break
      }

      case ActionTypes.TRAVEL_DATE_CHANGE: {
        this.travelDate = action.value
        this.emit('change')
        break
      }
      default:
    }
  }
}

const searchappbarStore = new SearchAppBarStore()
dispatcher.register(searchappbarStore.handleActions.bind(searchappbarStore))
export default searchappbarStore
