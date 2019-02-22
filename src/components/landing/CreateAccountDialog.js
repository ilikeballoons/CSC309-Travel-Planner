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

import LandingStore from './LandingStore'
import LandingActions from './LandingActions'

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

  updateState = () => this.setState(this.getNewState())

  handleChange = field => event =>  LandingActions.createAccountChange(event.target.value)

  handleDateChange = date => LandingActions.createAccountChange(date)

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
            <TextField
              value={this.state.username}
              onChange={this.handleChange('Username/Email')}
              margin='dense'
              id='username'
              label='Username/Email'
              type='text'
              placeholder='Username/Email'
              fullWidth />
            <TextField
              value={this.state.fullName}
              onChange={this.handleChange('Full Name')}
              margin='dense'
              id='fullName'
              label='Full Name'
              type='text'
              placeholder='Full Name'
              fullWidth />
            <TextField
              value={this.state.password}
              onChange={this.handleChange('Password')}
              margin='dense'
              id='password'
              label='Password'
              type='password'
              placeholder='Password'
              fullWidth />
            <TextField
              value={this.state.password2}
              onChange={this.handleChange('Password2')}
              margin='dense'
              id='password2'
              label='Confirm your password'
              type='password'
              placeholder='Confirm your password'
              fullWidth />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker value={this.state.birthday} onChange={this.handleDateChange} />
            </MuiPickersUtilsProvider>
          </form>
        </DialogContent>
      </Dialog>
    )
  }
}

export default withStyles(styles)(CreateAccountDialog)
