import React from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Input from '@material-ui/core/Input'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'

import ItineraryStore from './ItineraryStore'
import UserStore from '../../UserStore'
import Hour from './Hour'
import SaveItineraryButton from './SaveItineraryButton'
import ClearItineraryButton from './ClearItineraryButton'
import ItinerarySaveSnackBar from './ItinerarySaveSnackBar'
import ItinerarySelect from './ItinerarySelect'
import ItineraryActions from './ItineraryActions'

const styles = theme => ({
  root: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    padding: '0 25px',
    marginLeft: 20,
    maxHeight: 835,
    width: 500
  },
  list: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius
  },
  input: {
    fontSize: '1.6rem',
    fontWeight: 400,
    color: theme.palette.primary.main,
    width: '50%'
  }
})

class Itinerary extends React.Component {
  constructor () {
    super()
    this.state = {
      ...ItineraryStore.getState(),
      user: UserStore.getState().user
    }
  }

  componentDidMount () {
    ItineraryStore.on('change', this.updateState)
    UserStore.on('change', this.updateState)
  }

  componentWillUnmount () {
    ItineraryStore.removeListener('change', this.updateState)
    UserStore.removeListener('change', this.updateState)
  }

  updateState = () => this.setState({ user: UserStore.getState().user, ...ItineraryStore.getState()})
  getHourEvent = (hour) => this.state.events.filter(e => e.hour === hour)[0]

  getHourComponents = () => {
    const hours = Array.from(Array(24).keys())
    return hours.map(hour => (
      <div key={hour}>
        <Hour time={hour} data={this.getHourEvent(hour)}/>
        <Divider />
      </div>)
    )
  }

  handleNameChange = (event) => ItineraryActions.changeItineraryName(event.target.value)
  render () {
    const { classes } = this.props
    const { events, name, id, location, saveSnackbarOpen, saveSnackbarMessage, user, selected } = this.state
    const itineraryLocation = location === ''
      ? user.location
      : location
    const hasItineraries = user.itineraries.length > 0
    return (
      <div className={classes.root}>
        <List className={classes.list}>
          <ListItem>
            <Input
              className={classes.input}
              value={name}
              onChange={this.handleNameChange}
              inputProps={{
                'aria-label': 'Description'
              }}
            />
          <div className={classes.buttonContainer}>
            <ClearItineraryButton />
            <SaveItineraryButton itinerary={{events, name, id, location: itineraryLocation }} open={saveSnackbarOpen} isNew={selected === -1} />
          </div>
          </ListItem>
          <ListItem>
            {hasItineraries &&<ItinerarySelect itineraries={user.itineraries} selected={selected} />}
          </ListItem>
          {this.getHourComponents()}
        </List>
        <ItinerarySaveSnackBar open={saveSnackbarOpen} message={saveSnackbarMessage} />
      </div>
    )
  }
}

export default withStyles(styles)(Itinerary)
