import React from 'react'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers'

import AdminStore from './AdminStore'
import AdminActions from './AdminActions'

const styles = theme => ({
  infoLayout: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
    overflow: 'auto'
  },
  editBtn: {
    position: 'absolute',
    right: 0,
    margin: 10
  }
})



class UserInfo extends React.Component {
  constructor () {
    super()
    const { currentUser, editModeOn } = AdminStore.getState()
    this.state = {
      currentUser,
      editModeOn
    }
  }

  componentDidMount () {
    AdminStore.on('change', this.updateState)
  }

  componentWillUnmount () {
    AdminStore.removeListener('change', this.updateState)
  }

  updateState = () => {
    const { currentUser, editModeOn } = AdminStore.getState()
    this.setState({currentUser, editModeOn})
  }

  updateBirthday = date => AdminActions.editUserBirthday(date)
  updateLocation = event => AdminActions.editUserLocation(event.target.value)
  updateMisc = event => AdminActions.editUserMisc(event.target.value)

  render () {
    const { classes } = this.props
    const { currentUser, editModeOn } = this.state
    const { birthday, location, description } = currentUser
    return (
      <div className={classes.infoLayout}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            margin='normal'
            name='birthday'
            label='Birthday'
            value={birthday}
            format='MMMM dd, yyyy'
            disableFuture
            openTo='year'
            views={['year', 'month', 'day']}
            disabled={!editModeOn}
            onChange={this.updateBirthday}
            className={classes.textField}
          />
        </MuiPickersUtilsProvider>
        <TextField
          disabled={!editModeOn}
          label='Location'
          value={location || ""}
          className={classes.textField}
          margin='normal'
          onChange={this.updateLocation}
        />
        <TextField
          disabled={!editModeOn}
          multiline
          label='Miscellaneous'
          value={description || ""}
          className={classes.textField}
          margin='normal'
          onChange={this.updateMisc}
        />
      </div>
    )
  }
}

export default withStyles(styles)(UserInfo)
