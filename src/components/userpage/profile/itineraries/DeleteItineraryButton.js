import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import UserProfileActions from '../UserProfileActions'

const styles = theme => ({
  root: {
    margin: [[-5, 0, 0, 10]]
  }
})

class DeleteItineraryButton extends React.Component {
  render () {
    const { classes, id } = this.props
    return (
      <Button
        variant='contained'
        color='secondary'
        className={classes.root}
        onClick={() => UserProfileActions.deleteItinerary(id)}>
        Delete
      </Button>
    )
  }
}

export default withStyles(styles)(DeleteItineraryButton)
