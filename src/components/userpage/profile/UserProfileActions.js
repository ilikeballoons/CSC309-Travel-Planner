import dispatcher from '../../../utils/Dispatcher'
import ActionTypes from '../../../utils/ActionTypes'
import { patchUser, deleteItinerary, patchItinerary } from '../../../utils/ServerMethods'

const UserProfileActions = {
  editBirthday (birthday) {
    dispatcher.dispatch({
      type: ActionTypes.USERPROFILE_EDIT,
      value: { birthday: new Date(birthday) }
    })
  },

  editDescription (description) {
    dispatcher.dispatch({
      type: ActionTypes.USERPROFILE_EDIT,
      value: { description }
    })
  },

  editFullName (fullName) {
    dispatcher.dispatch({
      type: ActionTypes.USERPROFILE_EDIT,
      value: { fullName }
    })
  },

  editLocation (location) {
    dispatcher.dispatch({
      type: ActionTypes.USERPROFILE_EDIT,
      value: { location }
    })
  },

  editProfilePicture (profilePicture) { // not implemented currently
    console.log(profilePicture); // TODO: save the picture to DB
    dispatcher.dispatch({
      type: ActionTypes.USERPROFILE_EDIT,
      value: { profilePicture }
    })
  },

  expandPanel (panelName) {
    dispatcher.dispatch({
      type: ActionTypes.USERPROFILE_EXPAND_PANEL,
      value: panelName
    })
  },

  toggleEditProfilePictureButton () {
    dispatcher.dispatch({
      type: ActionTypes.USERPROFILE_TOGGLE_EDIT_PROFILE_PICTURE_BUTTON
    })
  },

  toggleEditProfilePictureDialog () {
    dispatcher.dispatch({
      type: ActionTypes.USERPROFILE_TOGGLE_PROFILE_PICTURE_DIALOG
    })
  },

  toggleDeleteAccountDialog () {
    dispatcher.dispatch({
      type: ActionTypes.USERPROFILE_TOGGLE_DELETE_ACCOUNT_DIALOG
    })
  },

  closeConfirmSnackbar () {
    dispatcher.dispatch({
      type: ActionTypes.USERPROFILE_CHANGES_SUBMITTED,
      value: false
    })
  },

  closeSaveSnackbar () {
    dispatcher.dispatch({
      type: ActionTypes.USERPROFILE_TOGGLE_ITINERARY_SAVE_SNACKBAR,
      value: false
    })
  },

  openSaveSnackbar () {
    dispatcher.dispatch({
      type: ActionTypes.USERPROFILE_TOGGLE_ITINERARY_SAVE_SNACKBAR,
      value: true
    })
  },

  deleteAccount () { // TODO: this will be an object id, but for now it just deletes whatever user is logged in
    dispatcher.dispatch({
      type: ActionTypes.USERPROFILE_DELETE_ACCOUNT
    })
  },

  changeItineraryName (id, name) {
    dispatcher.dispatch({
      type: ActionTypes.USERPROFILE_ITINERARY_NAME_CHANGE,
      value: { id, name }
    })
  },

  cancelItineraryRename () {
    dispatcher.dispatch({
      type: ActionTypes.USERPROFILE_ITINERARY_RENAME_CANCEL
    })
  },

  confirmItineraryRename (id, name) {
    patchItinerary(id, name)
      .then((json) => {
        if (json) {
          dispatcher.dispatch({
            type: ActionTypes.USERPROFILE_ITINERARY_RENAME_CONFIRM,
            value: name
          })
          dispatcher.dispatch({
            type: ActionTypes.UPDATE_USER,
            value: json
          })
        } else {
          dispatcher.dispatch({
            type: ActionTypes.ITINERARY_PATCH_FAILURE
          })
        }
      })
  },

  toggleRenameItineraryDialog (id) {
    dispatcher.dispatch({
      type: ActionTypes.USERPROFILE_TOGGLE_RENAME_ITINERARY_DIALOG,
      value: id
    })
  },

  deleteItinerary (id) {
    deleteItinerary(id)
      .then((json) => {
        if (json) {
          dispatcher.dispatch({
            type: ActionTypes.USERPROFILE_EDIT,
            value: { itineraries: json.itineraries }
          })
          dispatcher.dispatch({
            type: ActionTypes.UPDATE_USER,
            value: json
          })
        } else {
          dispatcher.dispatch({
            type: ActionTypes.ITINERARY_DELETE_FAILURE
          })
        }
      })
  },

  submit (user) {
    patchUser(user)
      .then((res) => {
        dispatcher.dispatch({
          type: ActionTypes.USERPROFILE_CHANGES_SUBMITTED,
          value: true
        })
        dispatcher.dispatch({
          type: ActionTypes.UPDATE_USER,
          value: res
        })
      })
      .catch((error) => console.log(error))
    // Can be various error codes based on invalid input in the fields, or a success
  }
}

export default UserProfileActions
