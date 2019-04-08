import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import UserProfileActions from './UserProfileActions'

const styles = theme => ({
  root: {
    margin: [[-5, 0, 0, 10]]
  }
})

class DeleteAccountButton extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <Button
        variant='contained'
        color='secondary'
        className={classes.root}
        onClick={() => UserProfileActions.toggleDeleteAccountDialog(true)}>
        Delete Account
      </Button>
    )
  }
}

export default withStyles(styles)(DeleteAccountButton)
