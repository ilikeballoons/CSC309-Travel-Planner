import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import AdminStore from './AdminStore'
import AdminActions from './AdminActions'

const styles = theme => ({
  red: {
    color: theme.palette.secondary.main
  }
})

class PasswordDialog extends React.Component {
  constructor () {
    super()
    this.state=AdminStore.getState().changePW
  }

  componentDidMount () {
    AdminStore.on('change', this.updateState)
  }

  componentWillUnmount () {
    AdminStore.removeListener('change', this.updateState)
  }

  updateState = () => {
    this.setState(AdminStore.getState().changePW)
  }

  handlePassword = event => AdminActions.changePWPassword(event.target.value)
  handleRetype = event => AdminActions.changePWRetype(event.target.value)
  confirmValidPassword = () => this.state.password.length >= 6
  confirmPasswordMatch = () => this.state.password === this.state.retype

  submit = () => {
    AdminActions.changePWClickSubmit()
    if(this.confirmValidPassword() && this.confirmPasswordMatch()){
        AdminActions.changePWDialogClose()
        AdminActions.changePWSubmit({
          open: this.state.open,
          submit: this.state.submit,
          password: this.state.password,
          retype: this.state.retype
        })
    }
  }

  render () {
    const { classes } = this.props
    const { open, submit, password, retype } = this.state
    return (
      <Dialog
        open={open}
        onClose={() => AdminActions.changePWDialogClose()}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reset the password of the user here, type a new password and its confirmation.
          </DialogContentText>
          {submit && !this.confirmValidPassword() && <div className={classes.red}>Passwords must be at least 6 characters.</div>}
          {submit && !this.confirmPasswordMatch() && <div className={classes.red}>Passwords don't match.</div>}
          <TextField
            autoFocus
            margin='dense'
            className={classes.passwordBox}
            label='New Password'
            type='password'
            fullWidth
            value={password}
            onChange={this.handlePassword}
          />
          <TextField
            margin='dense'
            className={classes.passwordBox}
            label='Retype New Password'
            type='password'
            fullWidth
            value={retype}
            onChange={this.handleRetype}
          />
        </DialogContent>
        <DialogActions>
          <Button color='primary'
            onClick={() => AdminActions.changePWDialogClose()}>
            Cancel
          </Button>
          <Button color='secondary'
            onClick={this.submit}>
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(PasswordDialog)
