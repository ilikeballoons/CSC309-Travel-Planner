import React from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'

import ItineraryStore from './ItineraryStore'
import Hour from './Hour'

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
    const hours = Array.from(Array(24).keys())
    return hours.map(hour => <div key={hour}><Hour time={hour} /><Divider /></div>)
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
