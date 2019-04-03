import { EventEmitter } from 'events'
import dispatcher from '../../../utils/Dispatcher'

import ActionTypes from '../../../utils/ActionTypes'

class UserProfileStore extends EventEmitter {
  constructor () {
    super()
    this.deleteDialogOpen = false
    this.showEditProfilePictureButton = false
    this.showProfilePictureDialog = false
    this.snackbarOpen = false
    this.user = {}

    this.changePW = {
      open: false,
      submit: false,
      password: '',
      retype: ''
    }
  }

  getState () {
    return {
      // user: this.user,
      deleteDialogOpen: this.deleteDialogOpen,
      snackbarOpen: this.snackbarOpen,
      showEditProfilePictureButton: this.showEditProfilePictureButton,
      showProfilePictureDialog: this.showProfilePictureDialog,
      changePW: this.changePW,
      user: this.user
    }
  }

  handleActions (action) {
    switch (action.type) {
      case ActionTypes.USER_CHANGE_PW_OPEN: {
        this.changePW.open = true
        this.emit('change')
        break
      }
      case ActionTypes.USER_CHANGE_PW_CANCEL: {
        this.changePW = {
          open: false,
          submit: false,
          password: '',
          retype: ''
        }
        this.emit('change')
        break
      }

      case ActionTypes.USER_CHANGE_PW_CLICK_SUBMIT: {
        this.changePW.submit = true
        this.emit('change')
        break
      }

      case ActionTypes.USER_CHANGE_PW_SUBMIT: {
        this.changePW = {
          open: false,
          submit: false,
          password: '',
          retype: ''
        }
        this.user = action.value
        this.emit('change')
        break
      }

      case ActionTypes.USER_CHANGE_PW_PASSWORD: {
        this.changePW.password = action.value
        this.emit('change')
        break
      }

      case ActionTypes.USER_CHANGE_PW_RETYPE: {
        this.changePW.retype = action.value
        this.emit('change')
        break
      }
      case ActionTypes.USERPROFILE_EDIT: {
        const key = Object.keys(action.value)[0]
        this.user[key] = action.value[key]
        this.emit('change')
        break
      }

      case ActionTypes.USERPROFILE_TOGGLE_DELETE_ACCOUNT_DIALOG: {
        this.deleteDialogOpen = !this.deleteDialogOpen
        this.emit('change')
        break
      }

      case ActionTypes.USERPROFILE_TOGGLE_EDIT_PROFILE_PICTURE_BUTTON: {
        this.showEditProfilePictureButton = !this.showEditProfilePictureButton
        this.emit('change')
        break
      }

      case ActionTypes.USERPROFILE_TOGGLE_PROFILE_PICTURE_DIALOG: {
        this.showProfilePictureDialog = !this.showProfilePictureDialog
        this.emit('change')
        break
      }

      case ActionTypes.USERPROFILE_CHANGES_SUBMITTED: {
        this.snackbarOpen = action.value
        this.emit('change')
        break
      }

      case ActionTypes.SIGNIN_DIALOG_SIGNIN_SUCCESS: {
        const { birthday, location, description, fullName, privilege, username } = action.value // profilePicture
        this.user = {
          birthday: new Date(birthday),
          location,
          description,
          fullName,
          privilege,
          username
          // profilePicture
        }
        this.user = this.user
        this.emit('change')
        break
      }

      default:
    }
  }
}

const userProfileStore = new UserProfileStore()
dispatcher.register(userProfileStore.handleActions.bind(userProfileStore))
export default userProfileStore
