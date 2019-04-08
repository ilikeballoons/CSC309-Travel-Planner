import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import UserProfileActions from '../UserProfileActions'


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
  },

  input: {
    fontSize: '1.6rem',
    fontWeight: 400,
    color: theme.palette.primary.main,
    width: '50%'
  }
})

class RenameItineraryDialog extends React.Component {
  handleNameChange = (event) => UserProfileActions.changeItineraryName(this.props.itinerary._id, event.target.value)
  render() {
    const { open, itinerary, classes } = this.props
    const id = (itinerary && itinerary._id) || null
    const name = (itinerary && itinerary.name) || ''
    return (
      <Dialog
        open={open}
        onClose={() => UserProfileActions.toggleRenameItineraryDialog()}
        className={classes.root}
        TransitionProps={{
          in: open,
          timeout: 500
        }}>
        <DialogTitle
          className={classes.title}>
          Rename Itinerary
        </DialogTitle>
        <DialogContent className={classes.content}>
          <Input
            className={classes.input}
            value={name}
            onChange={this.handleNameChange}
            inputProps={{
              'aria-label': 'Name'
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='secondary' onClick={() => UserProfileActions.cancelItineraryRename()}>
            Cancel
          </Button>
          <Button variant='contained' color='primary' onClick={() => UserProfileActions.confirmItineraryRename(id, name)}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      )
  }
}

export default withStyles(styles)(RenameItineraryDialog)
