import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import ItineraryActions from './ItineraryActions'

const styles = theme => ({
  root: {
    margin: [[-5, 0, 0, 10]]
  }
})

class SaveItineraryButton extends React.Component {
  render () {
    const { classes, itinerary, isNew } = this.props
    const onClick = isNew
      ? () => ItineraryActions.saveItinerary(itinerary)
      : () => ItineraryActions.patchItineraryChanges(itinerary.id, itinerary.name, itinerary.events)
    return (
      <Button
        variant='contained'
        color='primary'
        className={classes.root}
        onClick={onClick}>
        Submit
      </Button>
    )
  }
}

export default withStyles(styles)(SaveItineraryButton)
