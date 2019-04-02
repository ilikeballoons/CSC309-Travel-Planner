import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Avatar from '@material-ui/core/Avatar'
import SentimentVeryDissatisfied from '@material-ui/icons/SentimentVeryDissatisfied'

// import UserProfileStore from './UserProfileStore'
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

class ConfirmDeleteDialog extends React.Component {
  render () {
    const { open, classes } = this.props
    return (
      <Dialog
        open={open}
        onClose={() => UserProfileActions.toggleDeleteAccountDialog()}
        className={classes.root}
        TransitionProps={{
          in: open,
          timeout: 500
        }}>
        <Avatar className={classes.avatar}>
          <SentimentVeryDissatisfied />
        </Avatar>
        <DialogTitle
          className={classes.title}>
          Delete Account
        </DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText>
            This operation is permanent and cannot be undone. Are you sure you want to delete your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='default' onClick={() => UserProfileActions.toggleDeleteAccountDialog()}>
            Cancel
          </Button>
          <Button variant='contained' color='secondary' onClick={() => UserProfileActions.deleteAccount()}>
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(ConfirmDeleteDialog)
