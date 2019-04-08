import dispatcher from '../../utils/Dispatcher'
import ActionTypes from '../../utils/ActionTypes'
import { getAllUsers, patchUser, getUsersByName, deleteUser } from '../../utils/ServerMethods'

const AdminActions = {
  clickSubmit () {
    dispatcher.dispatch({
      type: ActionTypes.ADMIN_CHANGE_PW_CLICK_SUBMIT
    })
  },

  changePWDialogOpen () {
    dispatcher.dispatch({
      type: ActionTypes.ADMIN_CHANGE_PW_OPEN
    })
  },

  changePWDialogClose () {
    dispatcher.dispatch({
      type: ActionTypes.ADMIN_CHANGE_PW_CANCEL
    })
  },

  changePWClickSubmit () {
    dispatcher.dispatch({
      type: ActionTypes.ADMIN_CHANGE_PW_CLICK_SUBMIT
    })
  },

  changePWSubmit (user) {
    patchUser(user)
      .then((res) => {
        dispatcher.dispatch({
          type: ActionTypes.ADMIN_CHANGE_PW_SUBMIT,
          value: user
        })
        dispatcher.dispatch({
          type: ActionTypes.ADMIN_TOGGLE_SNACKBAR,
          value: { open: true, message: `Password changed!` }
        })
      })
      .catch((error) => {
        dispatcher.dispatch({
          type: ActionTypes.ADMIN_TOGGLE_SNACKBAR,
          value: { open: true, message: `Changes not saved! ${error}` }
        })
      })
  },

  changePWPassword (password) {
    dispatcher.dispatch({
      type: ActionTypes.ADMIN_CHANGE_PW_PASSWORD,
      value: password
    })
  },

  changePWRetype (retype) {
    dispatcher.dispatch({
      type: ActionTypes.ADMIN_CHANGE_PW_RETYPE,
      value: retype
    })
  },

  deleteUserDialogOpen () {
    dispatcher.dispatch({
      type: ActionTypes.ADMIN_DELETE_DIALOG_OPEN
    })
  },

  deleteUserDialogCancel () {
    dispatcher.dispatch({
      type: ActionTypes.ADMIN_DELETE_DIALOG_CANCEL
    })
  },

  deleteUserDialogSubmit (user) {
    deleteUser(user)
      .then((res) => {
        dispatcher.dispatch({
          type: ActionTypes.ADMIN_DELETE_DIALOG_SUBMIT
        })
        dispatcher.dispatch({
          type: ActionTypes.ADMIN_TOGGLE_SNACKBAR,
          value: { open: true, message: `${res.username} was deleted!` }
        })
        getAllUsers()
          .then((result) => {
            dispatcher.dispatch({
              type: ActionTypes.ADMIN_USER_LOAD,
              value: result
            })
          })
      })
      .catch((error) => {
        dispatcher.dispatch({
          type: ActionTypes.ADMIN_TOGGLE_SNACKBAR,
          value: { open: true, message: `Changes not saved! ${error}` }
        })
      })
  },

  editModeOn () {
    dispatcher.dispatch({
      type: ActionTypes.ADMIN_EDIT_USER_ON
    })
  },

  editModeSave (user) {
    patchUser(user) // user is the one with all info
      .then((res) => {
        dispatcher.dispatch({
          type: ActionTypes.ADMIN_EDIT_USER_SAVE
        })
        dispatcher.dispatch({
          type: ActionTypes.ADMIN_TOGGLE_SNACKBAR,
          value: { open: true, message: 'Changes saved!' }
        })
      }).catch((error) => {
        dispatcher.dispatch({
          type: ActionTypes.ADMIN_TOGGLE_SNACKBAR,
          value: { open: true, message: `Changes not saved! ${error}` }
        })
      })
  },

  editUserBirthday (birthday) {
    dispatcher.dispatch({
      type: ActionTypes.ADMIN_EDIT_USER_BIRTHDAY,
      value: birthday
    })
  },

  editUserLocation (location) {
    dispatcher.dispatch({
      type: ActionTypes.ADMIN_EDIT_USER_LOCATION,
      value: location
    })
  },

  editUserMisc (misc) {
    dispatcher.dispatch({
      type: ActionTypes.ADMIN_EDIT_USER_MISC,
      value: misc
    })
  },

  editUserFullName (fullName) {
    dispatcher.dispatch({
      type: ActionTypes.ADMIN_EDIT_USER_FULLNAME,
      value: fullName
    })
  },

  editUserProfilePicture (img) {
    dispatcher.dispatch({
      type: ActionTypes.ADMIN_PROFILE_PIC_DIALOG_OPEN,
      value: false
    })
    dispatcher.dispatch({
      type: ActionTypes.ADMIN_EDIT_USER_PROFILE_PICTURE,
      value: img
    })
  },

  toggleEditProfilePictureDialog (value) {
    dispatcher.dispatch({
      type: ActionTypes.ADMIN_PROFILE_PIC_DIALOG_OPEN,
      value
    })
  },

  startLoad () {
    return getAllUsers().then((res) => {
      dispatcher.dispatch({
        type: ActionTypes.ADMIN_USER_LOAD,
        value: res
      })
      return Promise.resolve()
    }).catch((error) => console.log(error))

  },

  changeUserDisplayed (user) {
    dispatcher.dispatch({
      type: ActionTypes.ADMIN_CHANGE_USER_DISPLAYED,
      value: user
    })
  },

  userSearchChange (query) {
    dispatcher.dispatch({
      type: ActionTypes.USERSEARCH_CHANGE,
      value: query
    })
    getUsersByName(query).then((res) => {
      dispatcher.dispatch({
        type: ActionTypes.ADMIN_USER_LOAD,
        value: res
      })
    }).catch((error) => {
      console.log(error)
    })
  },

  userSearch (query) {
    dispatcher.dispatch({
      type: ActionTypes.USERSEARCH_SEARCH,
      value: query
    })
  },

  toggleSnackbar (value) {
    dispatcher.dispatch({
      type: ActionTypes.ADMIN_TOGGLE_SNACKBAR,
      value
    })
  }
}

export default AdminActions
