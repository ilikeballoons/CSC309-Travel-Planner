import React from 'react'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'


import { recommendations } from  '../../../Fixtures'
import ItineraryStore from './ItineraryStore'
import ItineraryEvent from './ItineraryEvent'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'noWrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'white'
  },
  hour: {
    width: 400
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

  getHourComponents = () => {
    const { classes } = this.props
    const hours = Array.from(Array(24).keys())
    const getHourString = (hour) => {
      if (hour.length === 1) return `0${hour}:00`
      return `${hour}:00`
    }
    return hours.map(hour => (
      <ListItem key={hour} className={classes.hour}>
        <Typography variant='h4' gutterBottom>{getHourString(hour)}</Typography>
      </ListItem>
    ))
  }

  updateState = () => this.setState(ItineraryStore.getState())


  render () {
    const { classes } = this.props
    return (
      <DragDropContextProvider backend={HTML5Backend}>
          <div >
            <List className={classes.root}>
              <ListItem>
                <ListItemText primary='Itinerary' />
              </ListItem>
              {this.getHourComponents()}
            </List>
          </div>
      </DragDropContextProvider>
    )
  }
}

export default withStyles(styles)(Itinerary)
