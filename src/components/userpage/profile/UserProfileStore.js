import { EventEmitter } from 'events'
import dispatcher from '../../../utils/Dispatcher'

import ActionTypes from '../../../utils/ActionTypes'

class UserProfileStore extends EventEmitter {
  constructor () {
    super()
    this.deleteDialogOpen = false
    this.showEditProfilePictureButton = false
    this.showProfilePictureDialog = false
    this.user = null
    this.newUser = null
  }

  getState () {
    return {
      deleteDialogOpen: this.deleteDialogOpen,
      showEditProfilePictureButton: this.showEditProfilePictureButton,
      showProfilePictureDialog: this.showProfilePictureDialog,
      user: this.newUser
    }
  }

  handleActions (action) {
    switch (action.type) {
      case ActionTypes.USERPROFILE_EDIT: {
        const key = Object.keys(action.value)[0]
        this.newUser[key] = action.value[key]
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
        this.newUser = this.user
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
