import dispatcher from '../../Dispatcher'
import ActionTypes from '../../ActionTypes'

const LandingActions = {
  createAccountOpen () {
    dispatcher.dispatch({
      type: ActionTypes.CREATE_ACCOUNT_OPEN
    })
  },

  createAccountClose () {
    dispatcher.dispatch({
      type: ActionTypes.CREATE_ACCOUNT_CLOSE
    })
  },

  createAccountSubmit (account) {
    dispatcher.dispatch({
      type: ActionTypes.CREATE_ACCOUNT_SUBMIT,
      value: account
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

export default LandingActions
