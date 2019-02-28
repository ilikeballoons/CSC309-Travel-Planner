import React from 'react'
import { recommendations } from '../../Fixtures'
import ItineraryEvent from './itinerary/ItineraryEvent'
import ItineraryStore from './itinerary/ItineraryStore'


import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'white,'
  },
  gridList: {
    width: 500,
    height: 450
  }
}

class Recommendations extends React.Component {
  constructor () {
    super()
    this.state = ItineraryStore.getState()
  }

  componentDidMount () {
    ItineraryStore.on('change', this.updateState)
  }

  componentWillUnmount () {
    ItineraryStore.removeListener('change', this.updateState)
  }

  updateState = () => this.setState(ItineraryStore.getState())

  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key='Subheader' cols={2} className={classes.subheader}>
            <ListSubheader component='div'>Itinerary</ListSubheader>
          </GridListTile>
          {recommendations.map(rec => <ItineraryEvent data={rec} key={rec.title} />)}
        </GridList>
      </div>
    )
  }
}

export default withStyles(styles)(Recommendations)
