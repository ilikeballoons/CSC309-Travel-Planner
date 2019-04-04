import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import AdminActions from './AdminActions'
import AdminStore from './AdminStore'

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
})

class AdminSnackbar extends React.Component {
  constructor () {
    super()
    const { snackbarOpen, snackbarMessage } = AdminStore.getState()
    this.state = {
      open: snackbarOpen,
      message: snackbarMessage
    }
  }
  componentDidMount () {
    AdminStore.on('change', this.updateState)
  }

  componentWillUnmount () {
    AdminStore.removeListener('change', this.updateState)
  }

  updateState = () => {
    const { snackbarOpen, snackbarMessage } = AdminStore.getState()
    this.setState({ open: snackbarOpen, message: snackbarMessage })
  }

  render () {
    const { classes } = this.props
    const { open, message } = this.state
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
        autoHideDuration={1000}
        onClose={() => AdminActions.toggleSnackbar({ open: false })}
        message={<span>{message}</span>}
        action={
          <IconButton
            key='close'
            color='inherit'
            className={classes.close}
            onClick={() => AdminActions.toggleSnackbar({ open: false })}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    )
  }
}

export default withStyles(styles)(AdminSnackbar)
