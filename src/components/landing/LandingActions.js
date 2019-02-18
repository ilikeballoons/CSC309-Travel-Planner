import dispatcher from '../../Dispatcher'

export const LANDING_ACTIONS = {
  SIGNIN_DIALOG_OPEN: 'landingActions.signinDialogOpen',
  SIGNIN_DIALOG_CLOSE: 'landingActions.signinDialogClose',
  SIGNIN_DIALOG_EMAIL_CHANGE: 'landingActions.signinDialogEmailChange',
  SIGNIN_DIALOG_PASSWORD_CHANGE: 'landingActions.signinDialogPasswordChange',
  SIGNIN_DIALOG_SIGNIN_START: 'landingActions.signinDialogSigninStart'
}

export function signinDialogOpen () {
  dispatcher.dispatch({
    type: LANDING_ACTIONS.SIGNIN_DIALOG_OPEN
  })
}

export function signinDialogClose () {
  dispatcher.dispatch({
    type: LANDING_ACTIONS.SIGNIN_DIALOG_CLOSE
  })
}

export function signinDialogEmailChange (email) {
  dispatcher.dispatch({
    type: LANDING_ACTIONS.SIGNIN_DIALOG_EMAIL_CHANGE,
    value: email
  })
}

export function signinDialogPasswordChange (password) {
  dispatcher.dispatch({
    type: LANDING_ACTIONS.SIGNIN_DIALOG_PASSWORD_CHANGE,
    value: password
  })
}

export function signinDialogSigninStart (account) {
  dispatcher.dispatch({
    type: LANDING_ACTIONS.SIGNIN_DIALOG_SIGNIN_START,
    value: account
  })
}
