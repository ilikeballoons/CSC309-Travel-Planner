import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import LandingStore from './LandingStore'
import * as LandingActions from './LandingActions'


export default class SigninDialog extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: LandingStore.getOpenState(),
      email: LandingStore.getEmail(),
      password: LandingStore.getPassword()
    }
  }

  componentDidMount () {
    LandingStore.on('storeUpdated', this.updateOpen)
    LandingStore.on('emailChanged', this.updateEmail)
    LandingStore.on('passwordChanged', this.updatePassword)
  }

  componentWillUnmount () {
    LandingStore.removeListener('storeUpdated', this.updateOpen)
    LandingStore.removeListener('emailChanged', this.updateEmail)
    LandingStore.removeListener('passwordChanged', this.updatePassword)
  }

  updateOpen = () => {
    this.setState({ open: LandingStore.getOpenState() })
  }

  updateEmail = name => event => {
    this.setState({ email: event.target.value })
    LandingActions.signinDialogEmailChange(this.state.email)
  }

  updatePassword = name => event => {
    this.setState({ password: event.target.value })
    LandingActions.signinDialogPasswordChange(this.state.password)
  }

  doLogin = () => {
    LandingActions.signinDialogSigninStart({
      email: this.state.email,
      password: this.state.password
    })
    this.props.onClose()
  }

  render () {
    return (
      <Dialog open={this.state.open} onClose={this.props.onClose}>
        <DialogTitle id='signinDialogTitle'>Sign In</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send
            updates occasionally.
          </DialogContentText>
          <TextField
            value={this.state.email}
            onChange={this.updateEmail('Email Address')}
            autoFocus
            margin='dense'
            id='email'
            label='Email Address'
            type='email'
            fullWidth
          />
          <TextField
            value={this.state.password}
            onChange={this.updatePassword('Password')}
            margin='dense'
            id='password'
            label='Password'
            type='password'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={this.doLogin} color='primary'>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
