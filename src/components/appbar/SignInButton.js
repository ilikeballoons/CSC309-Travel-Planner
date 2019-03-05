import React from 'react'
import Button from '@material-ui/core/Button'

import LoginStates from '../../utils/LoginStates'
import AppStore from '../AppStore'
import SearchAppBarActions from './SearchAppBarActions'

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

  getButtonText = (loginStatus) => loginStatus === LoginStates.loggedIn
      ? 'Sign out'
      : 'Sign in'

  updateState = () => this.setState({ buttonText: this.getButtonText(AppStore.getState().loggedInState) })
  render () {
    const { buttonText } = this.state
    return (
      <Button variant='contained' color='primary'
        onClick={() => buttonText === 'Sign in'
          ? SearchAppBarActions.signinDialogOpen()
          : SearchAppBarActions.signOut()}>
        {buttonText}
      </Button>
    )
  }
}
