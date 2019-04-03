import React from 'react'
import Button from '@material-ui/core/Button'

import LoginStates from '../../utils/LoginStates'
import SearchAppBarStore from './SearchAppBarStore'
import SearchAppBarActions from './SearchAppBarActions'

export default class SignInButton extends React.Component {
  constructor () {
    super()
    this.state = { buttonText: this.getButtonText(SearchAppBarStore.getState().login.loggedInState) }
  }

  componentDidMount () {
    SearchAppBarStore.on('change', this.updateState)
    this._isMounted = true
  }

  componentWillUnmount () {
    SearchAppBarStore.removeListener('change', this.updateState)
    this._isMounted = false
  }

  getButtonText = (status) => status === LoginStates.loggedIn
      ? 'Sign out'
      : 'Sign in'

  updateState = () => this._isMounted && this.setState({ buttonText: this.getButtonText(SearchAppBarStore.getState().login.loggedInState) })

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
