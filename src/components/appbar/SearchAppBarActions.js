import dispatcher from '../../utils/Dispatcher'
import ActionTypes from '../../utils/ActionTypes'
import { postUser, login, logout } from '../../utils/ServerMethods'
import RecommendationsActions from '../userpage/recommendations/RecommendationsActions'
import AdminActions from '../admin/AdminActions'

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
          this.snackbarToggle(true)
          dispatcher.dispatch({
            type: ActionTypes.CREATE_ACCOUNT_CANCEL
          })
        }
      })
      .catch(() => dispatcher.dispatch({
        type: ActionTypes.CREATE_ACCOUNT_DUPLICATE_ACCOUNT
      }))
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
    RecommendationsActions.startLoad(searchQuery, travelDate)
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
        switch (res.status) {
          case 200: {
            const isAdmin = res.privilege === 1
            if (isAdmin) {
              dispatcher.dispatch({
                type: ActionTypes.UPDATE_USER,
                value: res
              })
              AdminActions.startLoad()
                .then(() => {
                  dispatcher.dispatch({
                    type: ActionTypes.SIGNIN_DIALOG_SIGNIN_SUCCESS,
                    value: { ...res }
                  })
                })
            } else {
              dispatcher.dispatch({
                type: ActionTypes.UPDATE_USER,
                value: res
              })
              dispatcher.dispatch({
                type: ActionTypes.SIGNIN_DIALOG_SIGNIN_SUCCESS,
                value: { travelDate, searchQuery, ...res }

              })
              RecommendationsActions.startLoad(searchQuery, travelDate)
            }
            break
          }
          case 404: {
            dispatcher.dispatch({
              type: ActionTypes.SIGNIN_DIALOG_USERNAME_NOT_FOUND
            })
            break
          }
          case 403: {
            dispatcher.dispatch({
              type: ActionTypes.SIGNIN_DIALOG_INVALID_PASSWORD
            })
            break
          }
          default: {
            console.log('internal server error' + res.status)
          }
        }
      })
  },

  signOut () {
    logout()
      .then((res) => dispatcher.dispatch({
        type: ActionTypes.SIGNOUT
      }))
      .catch((error) => console.log(error))
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
