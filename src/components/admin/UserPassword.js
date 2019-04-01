import React from 'react'
import Button from '@material-ui/core/Button'

import AdminActions from './AdminActions'

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

export default UserPassword
