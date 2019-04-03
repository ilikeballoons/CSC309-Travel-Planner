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
    patchUser(user).then((res) => {
      dispatcher.dispatch({
        type: ActionTypes.ADMIN_CHANGE_PW_SUBMIT,
        value: user
      })
    }).catch((err) => console.log(err))
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

  deleteUserDialogSubmit (user) { // WORKING
    deleteUser(user).then((res) => {
      dispatcher.dispatch({
        type: ActionTypes.ADMIN_DELETE_DIALOG_SUBMIT
      })
      getAllUsers().then((result) => {
        dispatcher.dispatch({
          type: ActionTypes.ADMIN_USER_LOAD,
          value: result
        })
      }).catch((error) => console.log(error))
    }).catch((err) => console.log(err))
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
      }).catch((error) => console.log(error))
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

  startLoad () {
    getAllUsers().then((res) => {
      dispatcher.dispatch({
        type: ActionTypes.ADMIN_USER_LOAD,
        value: res
      })
      // dispatcher.waitFor([searchappbarStore.dispatcherToken])
    }).catch((err) => {
      console.log(err)
    })
    // dispatcher.dispatch({
    //   type: ActionTypes.ADMIN_USER_LOAD
    // })
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
  }
}

export default AdminActions
