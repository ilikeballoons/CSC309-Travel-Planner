import React from 'react'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers'

import AdminStore from './AdminStore'
import AdminActions from './AdminActions'
import Autocomplete from '../appbar/AutoComplete'

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
  updateFullName = event => AdminActions.editUserFullName(event.target.value)

  render () {
    const { classes } = this.props
    const { currentUser, editModeOn } = this.state
    const { birthday, location, description, fullName } = currentUser
    const isLoading = Object.keys(currentUser) === 0
    const loading =
    <div className={classes.infoLayout}>
      <h1> Loading... </h1>
    </div>
    return (
         isLoading
          ? loading
          : (
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
                  />
                </MuiPickersUtilsProvider>
                <Autocomplete
                  page='admin'
                  searchQuery={location}
                  disabled={!editModeOn} />
                <TextField
                  disabled={!editModeOn}
                  multiline
                  label="Full Name"
                  value={fullName}
                  margin='normal'
                  onChange={this.updateFullName}
                  />
                <TextField
                  disabled={!editModeOn}
                  multiline
                  label='Description'
                  value={description || ''}
                  margin='normal'
                  onChange={this.updateMisc}
                />
            </div>
          )

    )
  }
}

export default withStyles(styles)(UserInfo)
