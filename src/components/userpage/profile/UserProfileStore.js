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
  }

  getState () {
    return {
      deleteDialogOpen: this.deleteDialogOpen,
      snackbarOpen: this.snackbarOpen,
      showEditProfilePictureButton: this.showEditProfilePictureButton,
      showProfilePictureDialog: this.showProfilePictureDialog,
      renameItineraryDialog: this.renameItineraryDialog,
      user: this.newUser,
      expandedPanel: this.expandedPanel
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

      case ActionTypes.USERPROFILE_EXPAND_PANEL: {
        this.expandedPanel = this.expandedPanel === action.value
          ? null
          : action.value
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
        const { birthday, location, description, fullName, privilege, username, itineraries } = action.value // profilePicture
        this.user = {
          birthday: new Date(birthday),
          location,
          description,
          fullName,
          privilege,
          username,
          itineraries
          // profilePicture
        }
        this.newUser = {
          birthday: new Date(birthday),
          location,
          description,
          fullName,
          privilege,
          username,
          itineraries
          // profilePicture
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
