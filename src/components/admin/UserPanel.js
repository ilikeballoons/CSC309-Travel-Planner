import React from 'react'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import UserPassword from './UserPassword.js'
import UserInfo from './UserInfo.js'
import { withStyles } from '@material-ui/core/styles'

import AdminActions from './AdminActions'
import AdminStore from './AdminStore'

const styles = theme => ({
  viewUser: {
    height: '100%',
    width: '66%',
    padding: [[0, 5]],
    position: 'relative'
  },
  userHeader: {
    display: 'flex',
    height: '20%',
    padding: 20
  },
  userAvatar: {
    width: 100,
    height: 100,
    margin: 'auto 0'
  },
  userHeaderText: {
    padding: [[0, 20]],
    margin: 'auto 0'
  },
  userOps: {
    display: 'flex',
    position: 'absolute',
    padding: 20,
    bottom: 0,
    right: 0
  },
  userBtn: {
    margin: [[0, 5]]
  }
})

class UserPanel extends React.Component {
  constructor () {
    super()
    this.state = {
      editModeOn: false,
      currentUser: {}
    }
  }

  componentDidMount () {
    AdminStore.on('change', this.updateState)
  }

  componentWillUnmount () {
    AdminStore.removeListener('change', this.updateState)
  }

  updateState = () => {
    const { editModeOn, currentUser } = AdminStore.getState()
    this.setState({ editModeOn, currentUser })
  }

  render () {
    const { classes } = this.props
    const { editModeOn, currentUser } = this.state
    const editButtonText = editModeOn ? 'Save' : 'Edit user information'
    const editButtonAction = editModeOn ? () => AdminActions.editModeCancel(currentUser) : () => AdminActions.editModeOn()
    return (
      <div className={classes.viewUser}>
        <div className={classes.userHeader}>
          <Avatar alt={currentUser.fullName}
            src={currentUser.profilePicture}
            className={classes.userAvatar}
          />
          <div className={classes.userHeaderText}>
            <Typography variant='h5' gutterBottom>
              {currentUser.fullName}
            </Typography>
            <Typography variant='subtitle1' gutterBottom>
              Username: {currentUser.username}
            </Typography>
            <Typography variant='subtitle1'>
              Password: <u>******</u>
              <UserPassword />
            </Typography>
          </div>
        </div>
        <Divider />
        <div>
          <UserInfo />
        </div>
        <div className={classes.userOps}>
          <Button variant='outlined'
            color='primary'
            className={classes.userBtn}
            onClick={editButtonAction}
          >
            {editButtonText}
          </Button>
          <Button variant='outlined' color='secondary'
            className={classes.userBtn}
            onClick={()=>AdminActions.deleteUserDialogOpen()}>
            Delete User
          </Button>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(UserPanel)
