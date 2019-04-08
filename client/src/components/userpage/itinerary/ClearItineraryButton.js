import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import ItineraryActions from './ItineraryActions'
import RecommendationsStore from '../recommendations/RecommendationsStore' // quick and dirty

const styles = theme => ({
  root: {
    margin: [[-5, 0, 0, 10]]
  }
})

class ClearItineraryButton extends React.Component {
  render () {
    const { classes, itinerary } = this.props
    const recs = RecommendationsStore.getState().recommendations
    return (
      <Button
        variant='contained'
        color='secondary'
        className={classes.root}
        onClick={() => ItineraryActions.clearItinerary(itinerary.events, recs)}>
        Clear
      </Button>
    )
  }
}

export default withStyles(styles)(ClearItineraryButton)
