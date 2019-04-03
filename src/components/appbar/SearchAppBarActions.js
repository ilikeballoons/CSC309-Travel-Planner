import dispatcher from '../../utils/Dispatcher'
import ActionTypes from '../../utils/ActionTypes'
import { postUser, login, logout } from '../../utils/ServerMethods'
import RecommendationActions from '../userpage/recommendations/RecommendationActions'

const SearchAppBarActions = {
  clickSubmit () {
    dispatcher.dispatch({
      type: ActionTypes.CREATE_ACCOUNT_CLICK_SUBMIT
    })
  },

  snackbarToggle (value) {
    dispatcher.dispatch({
      type: ActionTypes.CREATE_ACCOUNT_CONFIRM_TOGGLE,
      value
    })
  },

  createAccountOpen () {
    dispatcher.dispatch({
      type: ActionTypes.CREATE_ACCOUNT_OPEN
    })
  },

  createAccountClose () {
    dispatcher.dispatch({
      type: ActionTypes.CREATE_ACCOUNT_CANCEL
    })
  },

  createAccountChange (formData) {
    dispatcher.dispatch({
      type: ActionTypes.CREATE_ACCOUNT_CHANGE,
      value: formData
    })
  },

  createAccountSubmit (account) {
    postUser(account)
      .then((res) => {
        if (res === 201) {
          // TODO: can login the user here
          this.snackbarToggle(true)
          dispatcher.dispatch({
            type: ActionTypes.CREATE_ACCOUNT_CANCEL
          })
        }
      })
      .catch(() => dispatcher.dispatch({
        type: ActionTypes.CREATE_ACCOUNT_DUPLICATE_ACCOUNT
      }))

    //   })
    // dispatcher.dispatch({
    //   type: ActionTypes.CREATE_ACCOUNT_SUBMIT,
    //   value: account
    // })
  },

  landingSearchbarDateChange (date) {
    dispatcher.dispatch({
      type: ActionTypes.TRAVEL_DATE_CHANGE,
      value: date
    })
  },

  searchbarChange (query) {
    dispatcher.dispatch({
      type: ActionTypes.SEARCHBAR_CHANGE,
      value: query
    })
  },

  searchbarSearch (searchQuery, travelDate) {
    dispatcher.dispatch({
      type: ActionTypes.SEARCHBAR_SEARCH,
      value: searchQuery
    })
    RecommendationActions.startLoad(searchQuery, travelDate)
  },

  signinDialogOpen () {
    dispatcher.dispatch({
      type: ActionTypes.SIGNIN_DIALOG_OPEN
    })
  },

  signinDialogCancel () {
    dispatcher.dispatch({
      type: ActionTypes.SIGNIN_DIALOG_CANCEL
    })
  },

  signinDialogEmailChange (email) {
    dispatcher.dispatch({
      type: ActionTypes.SIGNIN_DIALOG_EMAIL_CHANGE,
      value: email
    })
  },

  signinDialogPasswordChange (password) {
    dispatcher.dispatch({
      type: ActionTypes.SIGNIN_DIALOG_PASSWORD_CHANGE,
      value: password
    })
  },

  signinDialogSigninStart ({ username, password, travelDate, searchQuery }) {
    login({ username, password })
      .then((res) => {
        let type, value
        switch (res.status) {
          case 200: {
            type = ActionTypes.SIGNIN_DIALOG_SIGNIN_SUCCESS
            value = { ...res }
            dispatcher.dispatch({
              type: ActionTypes.UPDATE_USER,
              value: res
            })
            RecommendationActions.startLoad(searchQuery, travelDate)
            break
          }
          case 404: {
            type = ActionTypes.SIGNIN_DIALOG_USERNAME_NOT_FOUND
            break
          }
          case 403: {
            type = ActionTypes.SIGNIN_DIALOG_INVALID_PASSWORD
            break
          }
          default: {
            console.log('internal server error' + res.status)
          }
        }
        dispatcher.dispatch({ type, value })
      })
  },

  signOut () {
    logout()
      .then((res) => dispatcher.dispatch({
        type: ActionTypes.SIGNOUT
      }))
      .catch((err) => console.log ('internal server error'))
  },

  userProfileOpen () {
    dispatcher.dispatch({
      type: ActionTypes.APPBAR_USER_PROFILE_OPEN
    })
  },

  userProfileClose () {
    dispatcher.dispatch({
      type: ActionTypes.APPBAR_USER_PROFILE_CLOSE
    })
  },

  toggleProfilePictureChooser (value) {
    dispatcher.dispatch({
      type: ActionTypes.CREATE_ACCOUNT_PROFILE_PICTURE_TOGGLE,
      value
    })
  },

  profilePictureSelect (value) {
    dispatcher.dispatch({
      type: ActionTypes.CREATE_ACCOUNT_PROFILE_PICTURE_SELECT,
      value
    })
    dispatcher.dispatch({
      type: ActionTypes.CREATE_ACCOUNT_PROFILE_PICTURE_TOGGLE,
      value: false
    })
  },

  profilePictureCancel () {
    dispatcher.dispatch({
      type: ActionTypes.CREATE_ACCOUNT_PROFILE_PICTURE_CANCEL
    })
    dispatcher.dispatch({
      type: ActionTypes.CREATE_ACCOUNT_PROFILE_PICTURE_TOGGLE,
      value: false
    })
  }
}

export default SearchAppBarActions
