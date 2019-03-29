import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import SearchAppBarActions from './SearchAppBarActions'

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
})

class ConfirmAccountCreateSnackbar extends React.Component {
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
        onClose={() => SearchAppBarActions.snackbarToggle(false)}
        message={<span>Account Created Successfully!</span>}
        action={
          <IconButton
            key='close'
            color='inherit'
            className={classes.close}
            onClick={() => SearchAppBarActions.snackbarToggle(false)}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    )
  }
}

export default withStyles(styles)(ConfirmAccountCreateSnackbar)
