import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import UserProfileActions from './UserProfileActions'

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
})

class ConfirmSnackbar extends React.Component {
  render () {
    const { classes, open } = this.props
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
        autoHideDuration={6000}
        onClose={() => UserProfileActions.closeConfirmSnackbar()}
        message={<span>Changes saved!</span>}
        action={
          <IconButton
            key='close'
            color='inherit'
            className={classes.close}
            onClick={() => UserProfileActions.closeConfirmSnackbar()}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    )
  }
}

export default withStyles(styles)(ConfirmSnackbar)
