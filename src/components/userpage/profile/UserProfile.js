import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers'
import DateFnsUtils from '@date-io/date-fns'
import { format } from 'date-fns'
import { withStyles } from '@material-ui/core/styles'

import ResetPWButton from './ResetPWButton'
import DeleteAccountButton from './DeleteAccountButton'
import AppStore from '../../AppStore'
import SearchAppBarActions from '../../appbar/SearchAppBarActions'
import UserProfileActions from './UserProfileActions'
import SearchAppBar from '../../appbar/SearchAppBar'
// import { currencies } from './../../../utils/Fixtures.js'

const styles = theme => ({
  header: {
    display: 'flex',
    height: '20%',
    padding: 20
  },
  avatar: {
    width: 100,
    height: 100,
    margin: 'auto 0'
  },
  headerText: {
    padding: [[0, 20]],
    margin: 'auto 0'
  },

  body: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
    overflow: 'auto'
  },
  actions: {
    display: 'flex',
    position: 'absolute',
    padding: 20,
    bottom: 0,
    right: 0
  },
})
class UserProfile extends React.Component {
  constructor () {
    super()
    this.state = {
      user: AppStore.getState().user
    }
  }

  componentDidMount () {
    AppStore.on('change', this.updateState)
  }

  componentWillUnmount () {
    AppStore.removeListener('change', this.updateState)
  }

  updateState = () => { this.setState(AppStore.getState().user) }

  render () {
    const { classes } = this.props
    const { user } = this.state

    return (
      <div className={classes.root}>
        <SearchAppBar page='userProfile'/>
        <div className={classes.header}>
          <Avatar alt='profile_pic'
            src={require('../../../images/avatar/kyle_quinlivan.png')}
            className={classes.avatar}
          />
          <div className={classes.headerText}>
            <Typography variant='h5'>
              {`${user.fullName}`}
            </Typography>
            <Typography variant='h6'>
              {`@${user.username}`}
            </Typography>
            <Typography variant='subtitle1'>
              {`Birthday: ${format(user.birthday, 'MMMM do yyyy')}`}
            </Typography>
            <Typography variant='subtitle1'>
              {`${user.location}`}
            </Typography>
            <Typography variant='subtitle2'>
              {`${user.description}`}
            </Typography>
          </div>
        </div>
        <Divider />
        <div className={classes.body}>
          <TextField
            multiline
            label='Full Name'
            value={user.fullName}
            className={classes.textField}
            margin='normal'
            onChange={(event) => UserProfileActions.editFullName(event.target.value)}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              margin='normal'
              name='birthday'
              label='Birthday'
              value={user.birthday}
              format='MMMM dd, yyyy'
              disableFuture
              openTo='year'
              views={['year', 'month', 'day']}
              onChange={(date) => UserProfileActions.editBirthday(date)}
              className={classes.textField}
            />
          </MuiPickersUtilsProvider>
          {/*<TextField
            disabled={!editModeOn}
            label='Location'
            value={location}
            className={classes.textField}
            margin='normal'
            onChange={this.updateLocation}
          />*/}
        {/*  <TextField
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
          </TextField>*/}
          <TextField
            multiline
            label='Location'
            value={user.location}
            className={classes.textField}
            margin='normal'
            onChange={(event) => UserProfileActions.editLocation(event.target.value)}
          />
          <TextField
            multiline
            label='Description'
            value={user.description}
            className={classes.textField}
            margin='normal'
            onChange={(event) => UserProfileActions.editDescription(event.target.value)}
          />
          <div className={classes.actions}>
            <DeleteAccountButton />
            <ResetPWButton />
          </div>
        </div>
      </div>
    )
  }
}
export default withStyles(styles)(UserProfile)
