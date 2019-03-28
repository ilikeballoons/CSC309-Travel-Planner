import dispatcher from '../../../utils/Dispatcher'
import ActionTypes from '../../../utils/ActionTypes'
import { patchUser } from '../../../utils/ServerMethods'

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

  closeSnackbar () {
    dispatcher.dispatch({
      type: ActionTypes.USERPROFILE_CHANGES_SUBMITTED,
      value: false
    })
  },

  deleteAccount () { // TODO: this will be an object id, but for now it just deletes whatever user is logged in
    dispatcher.dispatch({
      type: ActionTypes.USERPROFILE_DELETE_ACCOUNT
      // type: ActionTypes.USERPROFILE_DELETE_ACCOUNT,
      // value: objectId
    })
  },

  submit (user) {
    patchUser(user)
      .then((res) => {
        dispatcher.dispatch({
          type: ActionTypes.USERPROFILE_CHANGES_SUBMITTED,
          value: true
        })
      })
      .catch((error) => console.log(error))
    // Can be various error codes based on invalid input in the fields, or a success
  }
}

export default UserProfileActions
