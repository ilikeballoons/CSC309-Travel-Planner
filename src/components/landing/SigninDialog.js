import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import LandingStore from './LandingStore'
import LandingActions from './LandingActions'

const styles = {
  content: {
    padding: 20
  },

  title: {
    textAlign: 'center'
  },

  actions: {
    display: 'flex',
    justifyContent: 'column',
    alignItems: 'flex-start'
  }
}

class SigninDialog extends React.Component {
  constructor (props) {
    super(props)
    this.state = LandingStore.getState()
  }

  componentDidMount () {
    LandingStore.on('change', this.updateState)
  }

  componentWillUnmount () {
    LandingStore.removeListener('change', this.updateState)
  }

  updateState = () => {
    this.setState(LandingStore.getState()) // ?? does this even do anything?
  }

  updateEmail = name => event => {
    LandingActions.signinDialogEmailChange(event.target.value)
  }
  //
  updatePassword = name => event => {
    LandingActions.signinDialogPasswordChange(event.target.value)
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
      <Dialog
        open={this.state.open}
        onClose={this.props.onClose}>
        <DialogTitle
          id='signinDialogTitle'
          className={this.props.classes.title}>
          Sign In
        </DialogTitle>
        <DialogContent className={this.props.classes.content}>
          <DialogContentText>
            Please enter your login details below
          </DialogContentText>
          <form>
            <TextField
              autoComplete='username email'
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
              autoComplete='current-password'
              value={this.state.password}
              onChange={this.updatePassword('Password')}
              margin='dense'
              id='password'
              label='Password'
              type='password'
              fullWidth
            />
        </form>
        </DialogContent>
        <DialogActions className={this.props.classes.actions}>
          <Button onClick={this.forgotPassword} color='primary'>
            Forgot Password?
          </Button>
          <Button onClick={this.createAccount} color='primary'>
            Sign Up
          </Button>
          <Button variant='contained' onClick={this.doLogin} color='primary'>
            Log In
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(SigninDialog)
