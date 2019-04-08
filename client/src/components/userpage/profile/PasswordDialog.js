import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import UserProfileStore from './UserProfileStore'
import UserProfileActions from './UserProfileActions'

const styles = theme => ({
  red: {
    color: theme.palette.secondary.main
  }
})

class PasswordDialog extends React.Component {
  constructor () {
    super()
    const { changePW, user } = UserProfileStore.getState()
    this.state = { changePW, user }
  }

  componentDidMount () {
    UserProfileStore.on('change', this.updateState)
  }

  componentWillUnmount () {
    UserProfileStore.removeListener('change', this.updateState)
  }

  updateState = () => {
    const { changePW, user } = UserProfileStore.getState()
    this.setState({ changePW, user })
  }

  handlePassword = event => UserProfileActions.changePWPassword(event.target.value)
  handleRetype = event => UserProfileActions.changePWRetype(event.target.value)
  confirmValidPassword = () => this.state.changePW.password.length >= 4
  confirmPasswordMatch = () => this.state.changePW.password === this.state.changePW.retype

  submit = () => {
    UserProfileActions.changePWClickSubmit()
    if (this.confirmValidPassword() && this.confirmPasswordMatch()){
        UserProfileActions.changePWDialogClose()
        const user = this.state.user
        user.password = this.state.changePW.password
        UserProfileActions.changePWSubmit(user)
    }
  }

  render () {
    const { classes } = this.props
    const { open, submit, password, retype } = this.state.changePW
    return (
      <Dialog
        open={open}
        onClose={() => UserProfileActions.changePWDialogClose()}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reset the password of the user here, type a new password and its confirmation.
          </DialogContentText>
          {submit && !this.confirmValidPassword() && <div className={classes.red}>Passwords must be at least 4 characters.</div>}
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
            onClick={() => UserProfileActions.changePWDialogClose()}>
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
