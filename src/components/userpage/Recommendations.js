import React from 'react'

import { recommendations } from '../../Fixtures'
import ItineraryEvent from './itinerary/ItineraryEvent'

import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import ListSubheader from '@material-ui/core/ListSubheader'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxHeight: 1000,
    width: 'auto'
  },
  gridList: {
    width: 500,
    transform: 'translateZ(0)',
    overflow: 'auto'
  }
})

class Recommendations extends React.Component {
  render () {
    const { classes } = this.props
    const events = recommendations.map(rec => (<ItineraryEvent data={rec} key={rec.title} />))
    console.log(events)
    return (
      <div className={classes.root}>
        <GridList
          cols={2}
          cellHeight={200}
          className={classes.gridList}
          spacing={1}>
          {events}
        </GridList>
      </div>
    )
  }
}

export default withStyles(styles)(Recommendations)
