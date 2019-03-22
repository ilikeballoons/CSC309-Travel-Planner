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
    dispatcher.dispatch({
      type: ActionTypes.USERPROFILE_EDIT,
      value: { profilePicture }
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
