import React from 'react'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers'
import DateFnsUtils from '@date-io/date-fns'
import { format } from 'date-fns'

// import ResetPWButton from './ResetPWButton'
import PasswordDialog from './PasswordDialog.js'
import DeleteAccountButton from './DeleteAccountButton'
import SubmitButton from './SubmitButton'
import ResetPasswordButton from './ResetPasswordButton'
import ConfirmDeleteDialog from './ConfirmDeleteDialog'
import ConfirmSnackbar from './ConfirmSnackbar'
import UserProfileActions from './UserProfileActions'
import UserProfileStore from './UserProfileStore'
import SearchAppBar from '../../appbar/SearchAppBar'
import ItinerariesDisplay from './itineraries/ItinerariesDisplay'
import RenameItineraryDialog from './itineraries/RenameItineraryDialog'
import ProfilePicChooser from '../../appbar/ProfilePicChooser'

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
    this.state = UserProfileStore.getState()
  }

  componentDidMount () {
    UserProfileStore.on('change', this.updateState)
  }

  componentWillUnmount () {
    UserProfileStore.removeListener('change', this.updateState)
  }

  updateState = () => {
    this.setState(UserProfileStore.getState())
  }

  render () {
    const { classes } = this.props
    const {
      user,
      showEditProfilePictureButton,
      showProfilePictureDialog,
      renameItineraryDialog,
      deleteDialogOpen,
      snackbarOpen,
      expandedPanel
    } = this.state
    const { itineraries } = user
    const selectedItinerary = itineraries.filter((it) => it._id === renameItineraryDialog.id)[0]
    return (
      <div className={classes.root}>
        <SearchAppBar page='userProfile'/>
        <div className={classes.header}>
          <div
            className={classes.avatarContainer}
            onMouseEnter={() => UserProfileActions.toggleEditProfilePictureButton(true)}
            onMouseLeave={() => UserProfileActions.toggleEditProfilePictureButton(false)} >
            <Avatar alt='profile_pic'
              src={user.profilePicture ? user.profilePicture : require('../../../images/avatar/avatar.png')}
              className={classes.avatar} />
              {showEditProfilePictureButton &&
              <IconButton
                className={classes.editButton}
                color='secondary'
                onClick={() => UserProfileActions.toggleEditProfilePictureDialog(true)}>
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
              {`Birthday: ${format(new Date(user.birthday), 'MMMM do yyyy')}`}
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
          <ItinerariesDisplay itineraries={itineraries} expanded={expandedPanel}/>
          <div className={classes.actions}>
            <DeleteAccountButton />
            <ResetPasswordButton />
            <SubmitButton user={user} />
          </div>
        </div>
        <ConfirmDeleteDialog open={deleteDialogOpen}/>
        <ProfilePicChooser open={showProfilePictureDialog} page='profile' />
        <RenameItineraryDialog open={renameItineraryDialog.open} itinerary={selectedItinerary} />
        <ConfirmSnackbar open={snackbarOpen} />
        <PasswordDialog />
      </div>
    )
  }
}
export default withStyles(styles)(UserProfile)
