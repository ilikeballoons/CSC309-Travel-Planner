import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers'
import DateFnsUtils from '@date-io/date-fns'

import { withStyles } from '@material-ui/core/styles'

import ResetPWButton from './ResetPWButton'
import { currencies } from './../../../utils/Fixtures.js'

const styles = theme => ({
  body: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
    overflow: 'auto'
  }
})
class UserProfile extends React.Component {
  render () {
    const { classes, user, open } = this.props
    //const { birthday, location, currency, misc, editModeOn } = this.state

    return (
      <Dialog
        className={classes.root}
        open={open}
        TransitionProps={{
          in: open,
          timeout: 500
        }}>
        <DialogContent>
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
        </DialogContent>
      </Dialog>
    )
  }
}
export default withStyles(styles)(UserProfile)
