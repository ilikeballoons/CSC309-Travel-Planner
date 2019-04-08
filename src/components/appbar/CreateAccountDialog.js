import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import DateFnsUtils from '@date-io/date-fns'
import { DatePicker, MuiPickersUtilsProvider  } from 'material-ui-pickers';

import SearchAppBarStore from './SearchAppBarStore'
import SearchAppBarActions from './SearchAppBarActions'
import ProfilePicChooser from './ProfilePicChooser'

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  red: {
    color: 'red'
  },
  avatar: {
    width: 100,
    height: 100,
    margin: 'auto 0'
  }
}

class CreateAccountDialog extends React.Component {
  constructor () {
    super()
    this.state = SearchAppBarStore.getState().createAccount
  }

  componentDidMount () {
    SearchAppBarStore.on('change', this.updateState)
    this._isMounted = true
  }

  componentWillUnmount () {
    SearchAppBarStore.removeListener('change', this.updateState)
    this._isMounted = false
  }

  updateState = () => this._isMounted && this.setState(SearchAppBarStore.getState().createAccount)
  handleChange = field => event =>  SearchAppBarActions.createAccountChange({ [field]: event.target.value })
  handleDateChange = date => SearchAppBarActions.createAccountChange({ birthday: date })
  confirmValidPassword = () => this.state.password.length >= 4
  confirmPasswordMatch = () => this.state.password === this.state.password2
  confirmValidUsername = () => this.state.username.length >= 4
  confirmValidFullname = () => this.state.fullName
  confirmValidBirthday = () => this.state.birthday

  validate = () => {
    return this.confirmValidUsername()
    && this.confirmValidFullname()
    && this.confirmValidPassword()
    && this.confirmPasswordMatch()
    && this.confirmValidBirthday()
  }

  submit = () => {
    SearchAppBarActions.clickSubmit()
    if (this.validate()) {
      const { username, password, fullName, birthday, profilePicture } = this.state
      const location = SearchAppBarStore.getState().searchQuery
      SearchAppBarActions.createAccountSubmit({
        username,
        password,
        fullName,
        birthday,
        profilePicture,
        location,
        description: 'Hello World!', // default
        privilege: 0 // 0 = user, 1 = admin
      })
    }
  }
  render () {
    const { hasClickedSubmit, open, duplicate, username, password, password2, birthday, fullName, profilePicture, profilePictureOpen } = this.state
    const { classes } = this.props
    return (
      <Dialog
        open={open}
        onClose={() => SearchAppBarActions.createAccountClose()}
        TransitionProps={{
          in: open,
          timeout: 500
        }}>
        <DialogTitle>Create an account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in your personal details to create an account.
          </DialogContentText>
          <form className={classes.form}>
            <Avatar alt='profile_pic'
              src={profilePicture}
              className={classes.avatar}
              onClick={() => SearchAppBarActions.toggleProfilePictureChooser(true)}
            />
            {hasClickedSubmit && duplicate && <span className={classes.red}>Username taken</span>}
            {hasClickedSubmit && !this.confirmValidUsername() && <span className={classes.red}>Usernames must be at least 4 characters.</span>}
            <TextField
              value={username}
              onChange={this.handleChange('username')}
              autoComplete='username email'
              margin='dense'
              id='username'
              label='Username/Email'
              type='text'
              placeholder='Username/Email'
              fullWidth
              required />
            {hasClickedSubmit && !this.confirmValidFullname() && <span className={classes.red}>Full Names must be at least 4 characters.</span>}
            <TextField
              value={fullName}
              onChange={this.handleChange('fullName')}
              margin='dense'
              id='fullName'
              label='Full Name'
              type='text'
              placeholder='Full Name'
              fullWidth
              required />
            {hasClickedSubmit && !this.confirmValidPassword() && <span className={classes.red}>Passwords must be at least 6 characters.</span>}
            {hasClickedSubmit && !this.confirmPasswordMatch() && <span className={classes.red}>Passwords don't match.</span>}
            <TextField
              value={password}
              onChange={this.handleChange('password')}
              autoComplete='new-password'
              margin='dense'
              id='password'
              label='Password'
              type='password'
              placeholder='Password'
              fullWidth
              required />
            <TextField
              value={password2}
              onChange={this.handleChange('password2')}
              autoComplete='new-password'
              margin='dense'
              id='password2'
              label='Confirm your password'
              type='password'
              placeholder='Confirm your password'
              fullWidth
              required />
            {hasClickedSubmit && !this.confirmValidBirthday() && <span className={classes.red}>Please input your birthday.</span>}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                value={birthday}
                onChange={this.handleDateChange}
                disableFuture
                label='Date of birth'
                openTo='year'
                fullWidth
                required
                format='dd/MM/yyyy'
                views={['year', 'month', 'day']}/>
            </MuiPickersUtilsProvider>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            onClick={this.submit}
            color='primary'>
            Submit
          </Button>
        </DialogActions>
        <ProfilePicChooser open={profilePictureOpen} page='register' />
      </Dialog>
    )
  }
}

export default withStyles(styles)(CreateAccountDialog)
