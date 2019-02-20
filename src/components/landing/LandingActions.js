import dispatcher from '../../Dispatcher'
import ActionTypes from '../../ActionTypes'

const LandingActions = {
  signinDialogOpen () {
    dispatcher.dispatch({
      type: ActionTypes.SIGNIN_DIALOG_OPEN
    })
  },

  signinDialogClose () {
    dispatcher.dispatch({
      type: ActionTypes.SIGNIN_DIALOG_CLOSE
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
  }
}

export default LandingActions
