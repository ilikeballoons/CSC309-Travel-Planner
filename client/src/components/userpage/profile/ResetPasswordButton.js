import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import UserProfileActions from './UserProfileActions'

const styles = theme => ({
  root: {
    margin: [[-5, 0, 0, 10]]
  }
})

class ResetPasswordButton extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <Button
        variant='contained'
        color='default'
        className={classes.root}
        onClick={() => { UserProfileActions.changePWDialogOpen() }}>
        Reset Password
      </Button>
    )
  }
}

export default withStyles(styles)(ResetPasswordButton)
