import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Button from '@material-ui/core/Button'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
// import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'


import { profilePictures } from '../../utils/Utils'
import SearchAppBarActions from './SearchAppBarActions'
import UserProfileActions from '../userpage/profile/UserProfileActions'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: 450
  }
})

class ProfilePicChooser extends React.Component {
  handleSelect (event, page) {
    page === 'register' && SearchAppBarActions.profilePictureSelect(event.target.getAttribute('src'))
    page === 'profile' && UserProfileActions.editProfilePicture(event.target.getAttribute('src'))
  }

  render () {
    const { classes, open, page } = this.props
    const { prefix, links } = profilePictures
    return (
      <Dialog
        open={open}
        onClose={() => {
          page === 'register' && SearchAppBarActions.toggleProfilePictureChooser(false)
          page === 'profile' && UserProfileActions.toggleEditProfilePictureDialog(false)
        }}
        TransitionProps={{
          in: open,
          timeout: 500
        }}>
        <DialogTitle>Choose a profile picture</DialogTitle>
        <DialogContent>
          <GridList cellHeight={160} cols={3} className={classes.gridList}>
            {links.map((link, index) => (
              <GridListTile key={index} cols={1}>
                <img src={`${prefix}${link}.jpg`} alt={link} onClick={(e) => this.handleSelect(e, page)} />
              </GridListTile>
            ))}
          </GridList>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            onClick={() => {
              page === 'register' && SearchAppBarActions.profilePictureCancel()
              page === 'profile' && UserProfileActions.cancelProfilePictureDialog()
            }}
            color='secondary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(ProfilePicChooser)
