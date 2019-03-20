import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers'
import DateFnsUtils from '@date-io/date-fns'
import { withStyles } from '@material-ui/core/styles'

import ResetPWButton from './ResetPWButton'
import AppStore from '../../AppStore'
import SearchAppBarActions from '../../appbar/SearchAppBarActions'
// import { currencies } from './../../../utils/Fixtures.js'

const styles = theme => ({
  body: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
    overflow: 'auto'
  }
})
class UserProfile extends React.Component {
  constructor () {
    super()
    SearchAppBarActions.userProfileClose()
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
  updateBirthday = () => true //fill in

  render () {
    const { classes } = this.props
    const { user } = this.state
    console.log(user);
    //const { birthday, location, currency, misc, editModeOn } = this.state

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          {/* <Avatar alt='profile picture' className={classes.avatar} /> */}
          <div className={classes.headerText}>
            <Typography variant='h5' gutterBottom>
              {`${user.fullName}`}
            </Typography>
            <Typography variant='subtitle1' gutterBottom>
              {`@${user.username}`}
            </Typography>
            <Typography variant='subtitle1'>
              <ResetPWButton />
            </Typography>
          </div>
        </div>
        <Divider />
        <div className={classes.body}>
          <div className={classes.infoLayout}>
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
                onChange={this.updateBirthday}
                className={classes.textField}
              />
            </MuiPickersUtilsProvider>
          </div>
        </div>
      </div>
    )
  }
}
export default withStyles(styles)(UserProfile)
