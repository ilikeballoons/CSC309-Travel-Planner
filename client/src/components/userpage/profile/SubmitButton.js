import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import UserProfileActions from './UserProfileActions'

const styles = theme => ({
  root: {
    margin: [[-5, 0, 0, 10]]
  }
})

class SubmitButton extends React.Component {
  render () {
    const { classes, user } = this.props
    return (
      <Button
        variant='contained'
        color='primary'
        className={classes.root}
        onClick={() => {UserProfileActions.submit(user)}}>
        Submit
      </Button>
    )
  }
}

export default withStyles(styles)(SubmitButton)
