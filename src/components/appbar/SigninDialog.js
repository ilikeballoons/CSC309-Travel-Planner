import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import TextField from '@material-ui/core/TextField'

import SearchAppBarStore from './SearchAppBarStore'
import SearchAppBarActions from './SearchAppBarActions'
import LoginStates from '../../utils/LoginStates'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  avatar: {
    alignSelf: 'center',
    marginTop: '16px',
    backgroundColor: theme.palette.secondary.main
  },

  content: {
    padding: '0px 20px 20px 20px'
  },

  title: {
    textAlign: 'center'
  }
})

class SigninDialog extends React.Component {
  constructor (props) {
    super(props)
    const { signin, login, travelDate, searchQuery } = SearchAppBarStore.getState()
    this.state = { signin, login }
  }

  componentDidMount () {
    SearchAppBarStore.on('change', this.updateState)
    this._isMounted = true
  }

  componentWillUnmount () {
    SearchAppBarStore.removeListener('change', this.updateState)
    this._isMounted = false
  }

  updateState = () => {
    const { signin, login, travelDate, searchQuery } = SearchAppBarStore.getState()
    this._isMounted && this.setState({ signin, login, travelDate, searchQuery })
  }

  updateUsername = event => SearchAppBarActions.signinDialogEmailChange(event.target.value)

  updatePassword = event => SearchAppBarActions.signinDialogPasswordChange(event.target.value)

  handleKeyDown = event => event.keyCode === 13 && this.doLogin()

  createAccountOpen = () => SearchAppBarActions.createAccountOpen()

  cancel = () => SearchAppBarActions.signinDialogCancel()

  validate = () => this.state.signin.username && this.state.signin.password

  doLogin = () => {
    const { signin: { username, password }, travelDate, searchQuery } = this.state

    SearchAppBarActions.signinDialogSigninStart({ username, password, travelDate, searchQuery })
  }

  render () {
    const { loggedInState } = this.state.login
    const { open, dialogText, username, password } = this.state.signin
    return (
      <Dialog
        open={open && loggedInState !== LoginStates.loggedIn}
        onClose={this.cancel}
        className={this.props.classes.root}
        TransitionProps={{
          in: open,
          timeout: 500
        }}>
        <Avatar className={this.props.classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <DialogTitle
          id='signinDialogTitle'
          className={this.props.classes.title}>
          Sign In
        </DialogTitle>
        <DialogContent className={this.props.classes.content}>
          <DialogContentText>
            {dialogText}
          </DialogContentText>
          <form>
            <TextField
              autoComplete='username username'
              value={username}
              onChange={this.updateUsername}
              autoFocus
              margin='dense'
              id='username'
              label='Username'
              type='username'
              fullWidth
            />
            <TextField
              autoComplete='current-password'
              value={password}
              onChange={this.updatePassword}
              onKeyDown={this.handleKeyDown}
              margin='dense'
              id='password'
              label='Password'
              type='password'
              fullWidth
            />
        </form>
        </DialogContent>
        <DialogActions>
          { /*<Button onClick={this.forgotPassword} color='primary'>
            Forgot Password?
          </Button>*/}
          <Button variant='contained' onClick={this.createAccountOpen}>
            Sign Up
          </Button>
          <Button variant='contained' disabled={!this.validate()} onClick={this.doLogin} color='primary'>
            Log In
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(SigninDialog)
