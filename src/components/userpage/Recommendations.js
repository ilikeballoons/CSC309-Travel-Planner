import React from 'react'

import { recommendations } from '../../Fixtures'
import ItineraryEvent from './itinerary/ItineraryEvent'

import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import ListSubheader from '@material-ui/core/ListSubheader'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    width: 500,
    height: 450
  },
  subheader: {
    height: 'auto'
  }
})

class Recommendations extends React.Component {
  render () {
    const { classes } = this.props
    const events = recommendations.map(rec => (<ItineraryEvent data={rec} key={rec.title} />))
    console.log(events)
    return (
      <div className={classes.root}>
        <GridList cellHeight={180}>
          <GridListTile key='Subheader' cols={2} className={classes.subheader}>
            <ListSubheader component='div'>Recommendations</ListSubheader>
          </GridListTile>
          {events}
        </GridList>
      </div>
    )
  }
}

export default withStyles(styles)(Recommendations)
