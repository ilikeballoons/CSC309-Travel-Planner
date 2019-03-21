import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers'
import DateFnsUtils from '@date-io/date-fns'
import { format } from 'date-fns'
import { withStyles } from '@material-ui/core/styles'

import ResetPWButton from './ResetPWButton'
import DeleteAccountButton from './DeleteAccountButton'
import ConfirmDeleteDialog from './ConfirmDeleteDialog'
import AppStore from '../../AppStore'
import UserProfileActions from './UserProfileActions'
import UserProfileStore from './UserProfileStore'
import SearchAppBar from '../../appbar/SearchAppBar'
// import { currencies } from './../../../utils/Fixtures.js'

const styles = theme => ({
  header: {
    display: 'flex',
    height: '20%',
    padding: 20
  },
  avatarContainer: {
    display: 'flex',
    position: 'relative'
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
  editButton: {
    margin: theme.spacing.unit,
    position: 'absolute',
    top: '57%',
    left: '57%'
  }
})
class UserProfile extends React.Component {
  constructor () {
    super()
    const { deleteDialogOpen, showEditProfilePictureButton } = UserProfileStore.getState()
    this.state = {
      user: AppStore.getState().user,
      deleteDialogOpen,
      showEditProfilePictureButton
    }
  }

  componentDidMount () {
    AppStore.on('change', this.updateState)
    UserProfileStore.on('change', this.updateState)
  }

  componentWillUnmount () {
    AppStore.removeListener('change', this.updateState)
    UserProfileStore.removeListener('change', this.updateState)
  }

  updateState = () => {
    const { deleteDialogOpen, showEditProfilePictureButton } = UserProfileStore.getState()
    this.setState({
      user: AppStore.getState().user,
      deleteDialogOpen,
      showEditProfilePictureButton
    })
  }

  render () {
    const { classes } = this.props
    const { user, showEditProfilePictureButton } = this.state
    console.log(showEditProfilePictureButton);

    return (
      <div className={classes.root}>
        <SearchAppBar page='userProfile'/>
        <div className={classes.header}>
          <div className={classes.avatarContainer}>
            <Avatar alt='profile_pic'
              src={user.profilePicture}
              className={classes.avatar}
              onMouseEnter={() => UserProfileActions.toggleEditProfilePictureButton()}
              onMouseLeave={() => UserProfileActions.toggleEditProfilePictureButton()}
            >
            </Avatar>
              {showEditProfilePictureButton && <IconButton className={classes.editButton} color='secondary'>
                <EditIcon />
              </IconButton>}
          </div>
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
        <ConfirmDeleteDialog />
      </div>
    )
  }
}
export default withStyles(styles)(UserProfile)
