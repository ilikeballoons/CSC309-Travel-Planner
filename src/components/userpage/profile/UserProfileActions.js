import dispatcher from '../../../utils/Dispatcher'
import ActionTypes from '../../../utils/ActionTypes'
import { getAllUsers, patchUser, getUsersByName, deleteUser } from '../../../utils/ServerMethods'

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
  },

  changePWDialogOpen () {
    dispatcher.dispatch({
      type: ActionTypes.USER_CHANGE_PW_OPEN
    })
  },
  clickSubmit () {
    dispatcher.dispatch({
      type: ActionTypes.USER_CHANGE_PW_CLICK_SUBMIT
    })
  },

  changePWDialogOpen () {
    dispatcher.dispatch({
      type: ActionTypes.USER_CHANGE_PW_OPEN
    })
  },

  changePWDialogClose () {
    dispatcher.dispatch({
      type: ActionTypes.USER_CHANGE_PW_CANCEL
    })
  },

  changePWClickSubmit () {
    dispatcher.dispatch({
      type: ActionTypes.USER_CHANGE_PW_CLICK_SUBMIT
    })
  },

  changePWSubmit (user) {
    patchUser(user).then((res) => {
      dispatcher.dispatch({
        type: ActionTypes.USER_CHANGE_PW_SUBMIT,
        value: user
      })
    }).catch((err) => console.log(err))
  },

  changePWPassword (password) {
    dispatcher.dispatch({
      type: ActionTypes.USER_CHANGE_PW_PASSWORD,
      value: password
    })
  },

  changePWRetype (retype) {
    dispatcher.dispatch({
      type: ActionTypes.USER_CHANGE_PW_RETYPE,
      value: retype
    })
  }
}

export default UserProfileActions
