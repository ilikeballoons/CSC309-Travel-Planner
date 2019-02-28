import React from 'react'

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
    flexDirection: 'column',
    flexWrap: 'noWrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'white',
    width: 500
  },
  text: {
    color: 'primary'
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

  updateState = () => this.setState(ItineraryStore.getState())

  getHourComponents = () => {
    const { classes } = this.props
    const hours = Array.from(Array(24).keys())
    const getHourString = (hour) => {
      if (hour.length === 1) return `0${hour}:00`
      return `${hour}:00`
    }
    return hours.map(hour => (
      <ListItem key={`${hour}`} className={classes.hour}>
        <Typography variant='h4' gutterBottom>{getHourString(hour)}</Typography>
      </ListItem>
    ))
  }

  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <List>
          <ListItem>
            <ListItemText primary='Itinerary' />
          </ListItem>
          {this.getHourComponents()}
        </List>
      </div>
    )
  }
}

export default withStyles(styles)(Itinerary)
