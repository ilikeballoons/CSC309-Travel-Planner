import React from 'react'
import shortid from 'shortid'

import GridList from '@material-ui/core/GridList'
import { withStyles } from '@material-ui/core/styles'

import { recommendations } from '../../Fixtures'
import ItineraryEvent from './itinerary/ItineraryEvent'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflowY: 'scroll',
    overflowX: 'hidden',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    maxHeight: 835,
  },
  gridList: {
    width: 540,
    //height: 450,
    transform: 'translateZ(0)',
    overflow: 'auto'
  }
})

class Recommendations extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <GridList
          cols={2}
          cellHeight={180}
          className={classes.gridList}
          spacing={10}>
          {recommendations.map(rec => (<ItineraryEvent data={rec} key={shortid.generate()} />))}
        </GridList>
      </div>
    )
  }
}

export default withStyles(styles)(Recommendations)
