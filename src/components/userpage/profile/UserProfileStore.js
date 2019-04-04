import { EventEmitter } from 'events'
import dispatcher from '../../../utils/Dispatcher'
import ActionTypes from '../../../utils/ActionTypes'

class UserProfileStore extends EventEmitter {
  constructor () {
    super()
    this.deleteDialogOpen = false
    this.showEditProfilePictureButton = false
    this.showProfilePictureDialog = false
    this.renameItineraryDialog = { open: false }
    this.snackbarOpen = false
    this.user = null
    this.newUser = null
    this.expandedPanel = null
    this.changePW = {
      open: false,
      submit: false,
      password: '',
      retype: ''
    }
  }

  getState () {
    return {
      user: this.user,
      deleteDialogOpen: this.deleteDialogOpen,
      snackbarOpen: this.snackbarOpen,
      showEditProfilePictureButton: this.showEditProfilePictureButton,
      showProfilePictureDialog: this.showProfilePictureDialog,
      renameItineraryDialog: this.renameItineraryDialog,
      expandedPanel: this.expandedPanel,
      changePW: this.changePW
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

      case ActionTypes.USERPROFILE_EXPAND_PANEL: {
        this.expandedPanel = this.expandedPanel === action.value
          ? null
          : action.value
        this.emit('change')
        break
      }

      case ActionTypes.USERPROFILE_TOGGLE_DELETE_ACCOUNT_DIALOG: {
        this.deleteDialogOpen = action.value
        this.emit('change')
        break
      }

      case ActionTypes.USERPROFILE_TOGGLE_EDIT_PROFILE_PICTURE_BUTTON: {
        this.showEditProfilePictureButton = action.value
        this.emit('change')
        break
      }

      case ActionTypes.USERPROFILE_TOGGLE_PROFILE_PICTURE_DIALOG: {
        this.showProfilePictureDialog = action.value
        this.emit('change')
        break
      }

      case ActionTypes.USERPROFILE_CANCEL_PROFILE_PICTURE: {
        this.newUser.profilePicture = this.user.profilePicture
        this.emit('change')
        break
      }

      case ActionTypes.USERPROFILE_CHANGES_SUBMITTED: {
        this.snackbarOpen = action.value
        this.emit('change')
        break
      }

      case ActionTypes.SIGNIN_DIALOG_SIGNIN_SUCCESS: {
        const { birthday, location, description, fullName, privilege, username, itineraries, profilePicture } = action.value
        this.user = {
          birthday: new Date(birthday),
          location,
          description,
          fullName,
          privilege,
          username,
          itineraries,
          profilePicture
        }
        this.newUser = {
          birthday: new Date(birthday),
          location,
          description,
          fullName,
          privilege,
          username,
          itineraries,
          profilePicture
        }
        this.emit('change')
        break
      }

      case ActionTypes.USERPROFILE_TOGGLE_RENAME_ITINERARY_DIALOG: {
        if (!action.value) {
          this.renameItineraryDialog.open = false
          delete this.renameItineraryDialog.id
        } else {
          this.renameItineraryDialog.open = true
          this.renameItineraryDialog.id = action.value
        }
        this.emit('change')
        break
      }

      case ActionTypes.USERPROFILE_ITINERARY_NAME_CHANGE: {
        this.newUser.itineraries = this.user.itineraries.map((itinerary) => {
          if (itinerary._id === action.value.id) {
            const res = JSON.parse(JSON.stringify(itinerary))
            res.name = action.value.name
            return res
          }
          return itinerary
        })
        this.emit('change')
        break
      }

      case ActionTypes.USERPROFILE_ITINERARY_RENAME_CANCEL: {
        this.newUser.itineraries = [...this.user.itineraries] // clone the array
        this.renameItineraryDialog = {
          open: false,
          id: null
        }
        this.emit('change')
        break
      }

      case ActionTypes.USERPROFILE_ITINERARY_RENAME_CONFIRM: {
        this.user.itineraries = [...this.newUser.itineraries]
        this.renameItineraryDialog = {
          open: false,
          id: null
        }
        this.emit('change')
        break
      }

      case ActionTypes.UPDATE_USER: {
        delete action.value.status
        delete action.value.__v
        delete action.value._id
        this.user = action.value
        this.newUser = action.value
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
