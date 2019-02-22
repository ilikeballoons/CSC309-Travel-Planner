import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import LandingStore from './LandingStore'
import LandingActions from './LandingActions'

export default class CreateAccountDialog extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.getNewState()
  }

  componentDidMount () {
    LandingStore.on('change', this.updateState)
  }

  componentWillUnmount () {
    LandingStore.removeListener('change', this.updateState)
  }

  getNewState = () => {
    const { createAccount } = LandingStore.getState()
    return { createAccount }
  }

  updateState = () => this.setState(this.getNewState())

  render () {
    return (
      <Dialog
        open={this.state.createAccount.open}
        onClose={() => LandingActions.createAccountClose()}>
        <DialogTitle>Create an account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in your personal details to create an account.
          </DialogContentText>
          <form>
            <TextField
              margin='dense'
              id='username'
              label='Username/Email'
              type='text'
              placeholder='Username/Email' />
            <TextField
              margin='dense'
              id='password'
              label='Password'
              type='password'
              placeholder='Password' />
            <TextField
              margin='dense'
              id='password2'
              label='Confirm your password'
              type='password'
              placeholder='Confirm your password' />
            <TextField
              id='date'
              label='Birthday'
              type='date'
              defaultValue='2019-03-05' />
          </form>
        </DialogContent>
      </Dialog>
    )
  }
}
