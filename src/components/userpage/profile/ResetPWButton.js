import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    margin: [[-5, 0, 0, 10]]
  }
})

class ResetPWButton extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <Button variant='contained' color='primary' className={classes.root}>
        Reset Password
      </Button>
    )
  }
}

export default withStyles(styles)(ResetPWButton)
