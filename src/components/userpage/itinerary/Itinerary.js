import React from 'react'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import Paper from '@material-ui/core/Paper'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'


import { recommendations } from  '../../../Fixtures'
import ItineraryStore from './ItineraryStore'
import ItineraryEvent from './ItineraryEvent'

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

class Itinerary extends React.Component {
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

  getDayComponent = () => {

  }

  updateState = () => this.setState(ItineraryStore.getState())


  render () {
    const { classes } = this.props
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div className={classes.root}>
          <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key='Subheader' cols={2} className={classes.subheader}>
              <ListSubheader component='div'>Itinerary</ListSubheader>
            </GridListTile>
            {recommendations.map(rec => <ItineraryEvent data={rec} />)}
          </GridList>
        </div>
      </DragDropContextProvider>
    )
  }
}

export default withStyles(styles)(Itinerary)
