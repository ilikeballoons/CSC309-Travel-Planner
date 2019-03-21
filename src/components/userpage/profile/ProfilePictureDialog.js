import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Avatar from '@material-ui/core/Avatar'

import UserProfileActions from './UserProfileActions'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  avatar: {
    alignSelf: 'center',
    marginTop: '16px',
    backgroundColor: theme.palette.secondary.main
  },

  content: {
    padding: '0px 20px 20px 20px'
  },

  title: {
    textAlign: 'center'
  }
})

class ProfilePictureDialog extends React.Component {
  constructor () {
    super()
    this.file = null
  }

  handleFileChange = (file) => {
    this.file = file
  }

  render () {
    const { open, picture, classes } = this.props
    let file
    return (
      <Dialog
        open={open}
        onClose={() => UserProfileActions.toggleEditProfilePictureDialog()}
        className={classes.root}
        TransitionProps={{
          in: open,
          timeout: 500
        }}>
        <Avatar className={classes.avatar} src={picture} />
        <DialogTitle
          id='signinDialogTitle'
          className={classes.title}>
          Change your profile picture
        </DialogTitle>
        <DialogActions>
          <Button variant='contained' color='default' component='label'>
            Upload
            <input
              accept='image/*'
              style={{ display: 'none' }}
              type='file'
              onChange={(event) => this.handleFileChange(event.target.files[0])}
            />
          </Button>
          <Button variant='contained' color='primary' onClick={() => {
            UserProfileActions.editProfilePicture(this.file)
            UserProfileActions.toggleEditProfilePictureDialog()
          }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(ProfilePictureDialog)
