import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import AdminActions from './AdminActions'

const styles = theme => ({
  resetBtn: {
    margin: [[-5, 0, 0, 10]]
  }
})

class UserPassword extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <Button
        color='primary' className={classes.resetBtn}
        onClick={() => AdminActions.changePWDialogOpen()}>
        Reset Password
      </Button>
    )
  }
}

export default withStyles(styles)(UserPassword)
