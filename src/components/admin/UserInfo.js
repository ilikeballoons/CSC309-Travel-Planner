import React from 'react'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers'

import AdminStore from './AdminStore'
import AdminActions from './AdminActions'
import { currencies } from '../../utils/Fixtures.js'

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
    AdminStore.on('change', this.updateState)
  }

  updateState = () => {
    const { currentUser, editModeOn } = AdminStore.getState()
    this.setState({currentUser, editModeOn})
  }

  updateBirthday = date => AdminActions.editUserBirthday(date)
  updateLocation = event => AdminActions.editUserLocation(event.target.value)
  updateCurrency = event => AdminActions.editUserCurrency(currencies.filter(option => option.value === event.target.value)[0])
  updateMisc = event => AdminActions.editUserMisc(event.target.value)

  render () {
    const { classes } = this.props
    const { currentUser, editModeOn } = this.state
    const { birthday, location, currency, description } = currentUser
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
          value={location}
          className={classes.textField}
          margin='normal'
          onChange={this.updateLocation}
        />
        <TextField
          disabled={!editModeOn}
          select
          label='Currency'
          className={classes.textField}
          value={currency.value}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          onChange={this.updateCurrency}
          margin='normal'
        >
          {currencies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))
          }
        </TextField>
        <TextField
          disabled={!editModeOn}
          multiline
          label='Miscellaneous'
          value={description}
          className={classes.textField}
          margin='normal'
          onChange={this.updateMisc}
        />
      </div>
    )
  }
}

export default withStyles(styles)(UserInfo)
