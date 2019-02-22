import React from 'react'
import Button from '@material-ui/core/Button'
import LoginStates from '../../LoginStates'
import AppStore from '../AppStore'
// import AccountCircleIcon from '@material-ui/icons/AccountCircle'

export default class SignInButton extends React.Component {
  constructor () {
    super()
    this.state = { buttonText: 'Sign in' }
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

  updateState = () => this.setState({ buttonText: this.getButtonText(AppStore.getState().loggedInState) })
  render () {
    return (
      <Button variant='contained' color='primary' className='signInButton'
        onClick={this.props.onClick}>
        {this.state.buttonText}
        {/* <AccountCircleIcon /> */}
      </Button>
    )
  }
}
