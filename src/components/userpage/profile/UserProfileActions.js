import dispatcher from '../../../utils/Dispatcher'
import ActionTypes from '../../../utils/ActionTypes'

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

  deleteAccount () { // TODO: this will be an object id, but for now it just deletes whatever user is logged in
    dispatcher.dispatch({
      type: ActionTypes.USERPROFILE_DELETE_ACCOUNT
      // type: ActionTypes.USERPROFILE_DELETE_ACCOUNT,
      // value: objectId
    })
  }
}

export default UserProfileActions
