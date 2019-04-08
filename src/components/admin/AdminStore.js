import { EventEmitter } from 'events'
import dispatcher from '../../utils/Dispatcher'
import ActionTypes from '../../utils/ActionTypes'

class AdminStore extends EventEmitter {
  constructor () {
    super()
    this.userQuery = ''
    this.allUsers = []
    this.currentUser = {}
    this.editModeOn = false
    this.editModeSave = false
    this.profilePictureDialogOpen = false
    this.snackbarOpen = false
    this.snackbarMessage = ''

    this.changePW = {
      open: false,
      submit: false,
      password: '',
      retype: ''
    }

    this.deleteUser = {
      open: false,
      delete: false
    }
  }

  getState () {
    return {
      allUsers: this.allUsers,
      userQuery: this.userQuery,
      currentUser: this.currentUser,
      editModeOn: this.editModeOn,
      changePW: this.changePW,
      deleteUser: this.deleteUser,
      profilePictureDialogOpen: this.profilePictureDialogOpen,
      snackbarOpen: this.snackbarOpen,
      snackbarMessage: this.snackbarMessage
    }
  }

  handleActions (action) {
    switch (action.type) {
      case ActionTypes.ADMIN_CHANGE_PW_OPEN: {
        this.changePW.open = true
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_CHANGE_PW_CANCEL: {
        this.changePW = {
          open: false,
          submit: false,
          password: '',
          retype: ''
        }
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_CHANGE_PW_CLICK_SUBMIT: {
        this.changePW.submit = true
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_CHANGE_PW_SUBMIT: {
        this.changePW = {
          open: false,
          submit: false,
          password: '',
          retype: ''
        }
        this.currentUser = action.value
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_CHANGE_PW_PASSWORD: {
        this.changePW.password = action.value
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_CHANGE_PW_RETYPE: {
        this.changePW.retype = action.value
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_EDIT_USER_ON: {
        this.editModeOn = true
        this.editModeSave = false
        this.emit('change')
        break
      }
        
      case ActionTypes.ADMIN_EDIT_USER_SAVE: {
        this.editModeOn = false
        this.editModeSave = true
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_EDIT_USER_MISC: {
        this.currentUser.description = action.value
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_EDIT_USER_LOCATION: {
        this.currentUser.location = action.value
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_EDIT_USER_BIRTHDAY: {
        this.currentUser.birthday = action.value
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_EDIT_USER_PROFILE_PICTURE: {
        this.currentUser.profilePicture = action.value
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_EDIT_USER_FULLNAME: {
        this.currentUser.fullName = action.value
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_PROFILE_PIC_DIALOG_OPEN: {
        this.profilePictureDialogOpen = action.value
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_DELETE_DIALOG_OPEN: {
        this.deleteUser.open = true
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_DELETE_DIALOG_CANCEL: {
        this.deleteUser.open = false
        this.deleteUser.delete = false
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_DELETE_DIALOG_SUBMIT: {
        this.deleteUser = {
          open: false,
          delete: true
        }
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_USER_LOAD: {
        this.allUsers = action.value
        this.currentUser = this.allUsers[0]
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_CHANGE_USER_DISPLAYED: {
        this.currentUser = action.value
        this.editModeOn = false
        this.emit('change')
        break
      }

      case ActionTypes.USERSEARCH_CHANGE: {
        this.userQuery = action.value
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_TOGGLE_SNACKBAR: {
        this.snackbarOpen = action.value.open
        this.snackbarMessage = action.value.message || ''
        this.emit('change')
        break
      }

      default:
    }
  }
}

const adminStore = new AdminStore()
adminStore.dispatcherToken = dispatcher.register(adminStore.handleActions.bind(adminStore))
export default adminStore
