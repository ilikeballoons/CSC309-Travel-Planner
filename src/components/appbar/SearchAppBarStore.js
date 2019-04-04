import { EventEmitter } from 'events'
import dispatcher from '../../utils/Dispatcher'
import { LoginStates } from '../../utils/Utils'
import ActionTypes from '../../utils/ActionTypes'
import defaultProfilePicture from './../../images/defaultProfilePicture.png'

class SearchAppBarStore extends EventEmitter {
  constructor () {
    super()
    this.searchQuery = 'Toronto, CA' // Default search location
    this.travelDate = new Date()
    this.login = {
      loggedInState: LoginStates.noInput,
      privilege: 0
    }
    this.signin = {
      open: false,
      username: '',
      password: '',
      dialogText: ''
    }
    this.createAccount = {
      open: false,
      username: '',
      password: '',
      password2: '',
      birthday: null,
      fullName: '',
      profilePicture: defaultProfilePicture,
      hasClickedSubmit: false,
      duplicate: false,
      snackbarOpen: false,
      profilePictureOpen: false
    }
    this.userProfile = {
      open: false
    }
  }

  getState () {
    return {
      searchQuery: this.searchQuery,
      createAccount: this.createAccount,
      signin: this.signin,
      travelDate: this.travelDate,
      userProfile: this.userProfile,
      login: this.login
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
        this.createAccount = {
          open: false,
          username: '',
          password: '',
          password2: '',
          birthday: null,
          fullName: '',
          hasClickedSubmit: false,
          duplicate: false,
          snackbarOpen: this.createAccount.snackbarOpen,
          profilePictureOpen: false,
          profilePicture: defaultProfilePicture
        }
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
        this.createAccount.duplicate = false
        this.emit('change')
        break
      }

      case ActionTypes.CREATE_ACCOUNT_DUPLICATE_ACCOUNT: {
        this.createAccount.duplicate = true
        this.emit('change')
        break
      }

      case ActionTypes.CREATE_ACCOUNT_CONFIRM_TOGGLE: {
        this.createAccount.snackbarOpen = action.value
        this.emit('change')
        break
      }

      case ActionTypes.CREATE_ACCOUNT_PROFILE_PICTURE_TOGGLE: {
        this.createAccount.profilePictureOpen = action.value
        this.emit('change')
        break
      }

      case ActionTypes.CREATE_ACCOUNT_PROFILE_PICTURE_SELECT: {
        this.createAccount.profilePicture = action.value
        this.emit('change')
        break
      }

      case ActionTypes.CREATE_ACCOUNT_PROFILE_PICTURE_CANCEL: {
        this.createAccount.profilePicture = defaultProfilePicture
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
          password: '',
          dialogText: ''
        }
        this.login.loggedInState = LoginStates.noInput
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
        this.signin.dialogText = 'Logged in!'
        this.login = {
          loggedInState: LoginStates.loggedIn,
          username: action.value.username,
          privilege: action.value.privilege
        }
        this.searchQuery = action.value.location
        this.emit('change')
        break
      }

      case ActionTypes.SIGNIN_DIALOG_USERNAME_NOT_FOUND: {
        this.login.loggedInState = LoginStates.usernameNotFound
        this.signin.dialogText = 'Username not found.'
        this.emit('change')
        break
      }

      case ActionTypes.SIGNIN_DIALOG_INVALID_PASSWORD: {
        this.login.loggedInState = LoginStates.incorrectPassword
        this.signin.dialogText = 'Incorrect password. Did you forget your password?'
        this.emit('change')
        break
      }

      case ActionTypes.SIGNOUT: {
        this.signin = {
          open: false,
          username: '',
          password: '',
          dialogText: 'Please input your user information below.'
        }
        this.login.loggedInState = LoginStates.noInput
        this.emit('change')
        break
      }

      case ActionTypes.SEARCHBAR_CHANGE: {
        this.searchQuery = action.value
        this.emit('change')
        break
      }

      case ActionTypes.SEARCHBAR_SEARCH: {
        this.searchQuery = action.value
        this.emit('change')
        break
      }

      case ActionTypes.TRAVEL_DATE_CHANGE: {
        this.travelDate = action.value
        this.emit('change')
        break
      }

      case ActionTypes.APPBAR_USER_PROFILE_OPEN: {
        this.userProfile.open = true
        this.emit('change')
        break
      }

      case ActionTypes.APPBAR_USER_PROFILE_CLOSE: {
        this.userProfile.open = false
        this.emit('change')
        break
      }

      case ActionTypes.USERPROFILE_DELETE_ACCOUNT: {
        this.signin = {
          open: false,
          username: '',
          password: '',
          dialogText: ''
        }
        this.login.loggedInState = LoginStates.noInput
        this.emit('change')
        break
      }

      default:
    }
  }
}

const searchappbarStore = new SearchAppBarStore()
searchappbarStore.dispatcherToken = dispatcher.register(searchappbarStore.handleActions.bind(searchappbarStore))
export default searchappbarStore
