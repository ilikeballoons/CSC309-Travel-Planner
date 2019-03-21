import React from 'react'

import { withStyles } from '@material-ui/core/styles'
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
import { findWithAttribute } from '../../utils/Utils'
import { users } from '../../utils/Fixtures'
import defaultProfilePicture from './../../images/defaultProfilePicture.png'

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  red: {
    color: 'red'
  }
}

class CreateAccountDialog extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    Object.assign(this.state, SearchAppBarStore.getState().createAccount)
  }

  componentDidMount () {
    SearchAppBarStore.on('change', this.updateState)
  }

  componentWillUnmount () {
    SearchAppBarStore.removeListener('change', this.updateState)
  }

  updateState = () => this.setState(SearchAppBarStore.getState().createAccount)
  handleChange = field => event =>  SearchAppBarActions.createAccountChange({ [field]: event.target.value })
  handleDateChange = date => SearchAppBarActions.createAccountChange({ birthday: date })
  confirmValidPassword = () => this.state.password.length >= 6
  confirmPasswordMatch = () => this.state.password === this.state.password2
  confirmValidUsername = () => this.state.username.length >= 4
  confirmValidFullname = () => this.state.fullName.length >= 4
  confirmUsername = () => isNaN(findWithAttribute(users, 'username', this.state.username))
  confirmValidBirthday = () => this.state.birthday

  validate = () => {
    return this.confirmValidUsername()
    && this.confirmUsername()
    && this.confirmValidFullname()
    && this.confirmValidPassword()
    && this.confirmPasswordMatch()
    && this.confirmValidBirthday()
  }

  submit = () => {
    SearchAppBarActions.clickSubmit()
    if (this.validate()) {
      SearchAppBarActions.createAccountClose()
      SearchAppBarActions.createAccountSubmit({
        username: this.state.username,
        password: this.state.password,
        fullName: this.state.fullName,
        birthday: this.state.birthday,
        profilePicture: defaultProfilePicture,
        privilege: 0 // TODO: This is a magic number need to change
      })
    }
  }

  render () {
    const { hasClickedSubmit, open } = this.state
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
          <form className={this.props.classes.form}>
            {hasClickedSubmit && !this.confirmUsername() && <span className={classes.red}>Username taken</span>}
            {hasClickedSubmit && !this.confirmValidUsername() && <span className={classes.red}>Usernames must be at least 4 characters.</span>}
            <TextField
              value={this.state.username}
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
              value={this.state.fullName}
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
              value={this.state.password}
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
              value={this.state.password2}
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
                value={this.state.birthday}
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
      </Dialog>
    )
  }
}

export default withStyles(styles)(CreateAccountDialog)
