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

import '../../css/landing/CreateAccountDialog.css'
import LandingStore from './LandingStore'
import LandingActions from './LandingActions'
import { findWithAttribute } from '../../Utils'
import { users } from '../../Fixtures'

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}

class CreateAccountDialog extends React.Component {
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

  updateState = () => this.setState(this.getNewState().createAccount)

  handleChange = field => event =>  LandingActions.createAccountChange({ [field]: event.target.value })

  handleDateChange = date => LandingActions.createAccountChange({ birthday: date })

  confirmPassword = () => {
    return (!this.state.password && !this.state.password2)
    || this.state.password === this.state.password2
  }

  confirmUsername = () => {
    return isNaN(findWithAttribute(users, 'username', this.state.username))
  }

  validate = () => {
    return this.state.username
    && this.state.password
    && this.state.fullName
    && this.state.birthday
    // check if passwords match
    && this.confirmPassword()
    // check if user already exists
    && this.confirmUsername()

  }

  submit = () => {
    if (this.validate()) {
      LandingActions.createAccountClose()
      LandingActions.createAccountSubmit({
        username: this.state.username,
        password: this.state.password,
        fullName: this.state.fullName,
        birthday: this.state.birthday,
        privilege: 0 // TODO: This is a magic number need to change
      })
    }
  }

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
          <form className={this.props.classes.form}>
            {!this.confirmUsername() && <span className='red'>Username taken</span>}
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
            {!this.confirmPassword() && <span className='red'>Passwords don't match.</span>}
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
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                value={this.state.birthday}
                onChange={this.handleDateChange}
                disableFuture
                label='Date of birth'
                openTo='year'
                fullWidth
                required
                views={['year', 'month', 'day']}/>
            </MuiPickersUtilsProvider>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            onClick={this.submit}
            disabled={!this.validate()}
            color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(CreateAccountDialog)
