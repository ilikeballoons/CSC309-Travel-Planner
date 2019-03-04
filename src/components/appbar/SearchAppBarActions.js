import dispatcher from '../../utils/Dispatcher'
import ActionTypes from '../../utils/ActionTypes'

const SearchAppBarActions = {
  clickSubmit () {
    dispatcher.dispatch({
      type: ActionTypes.CREATE_ACCOUNT_CLICK_SUBMIT
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
    dispatcher.dispatch({
      type: ActionTypes.CREATE_ACCOUNT_SUBMIT,
      value: account
    })
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

  searchbarSearch (query) {
    dispatcher.dispatch({
      type: ActionTypes.SEARCHBAR_SEARCH,
      value: query
    })
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

  signinDialogSigninStart (account) {
    dispatcher.dispatch({
      type: ActionTypes.SIGNIN_DIALOG_SIGNIN_START,
      value: account
    })
  },

  signinDialogSigninSuccess () {
    dispatcher.dispatch({
      type: ActionTypes.SIGNIN_DIALOG_SIGNIN_SUCCESS
    })
  },

  signOut () {
    dispatcher.dispatch({
      type: ActionTypes.SIGNOUT
    })
  }
}

export default SearchAppBarActions
