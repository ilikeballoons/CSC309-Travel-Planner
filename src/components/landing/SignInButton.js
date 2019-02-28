import React from 'react'
import Button from '@material-ui/core/Button'
import LoginStates from '../../LoginStates'
import AppStore from '../AppStore'
import LandingActions from './LandingActions'
// import AccountCircleIcon from '@material-ui/icons/AccountCircle'

export default class SignInButton extends React.Component {
  constructor () {
    super()
    this.state = { buttonText: this.getButtonText(AppStore.getState().loggedInState)}
  }

  componentDidMount () {
    AppStore.on('change', this.updateState)
  }

  componentWillUnmount () {
    AppStore.removeListener('change', this.updateState)
  }

  getButtonText = (loginStatus) => {
    return loginStatus === LoginStates.loggedIn
      ? 'Sign out' : 'Sign in'
  }

  onClick = () => {
    this.state.buttonText === 'Sign in'
    ? LandingActions.signinDialogOpen()
    : LandingActions.signOut()
  }

  updateState = () => this.setState({ buttonText: this.getButtonText(AppStore.getState().loggedInState) })
  render () {
    return (
      <Button variant='contained' color='primary' className='signInButton'
        onClick={this.onClick}>
        {this.state.buttonText}
        {/* <AccountCircleIcon /> */}
      </Button>
    )
  }
}
