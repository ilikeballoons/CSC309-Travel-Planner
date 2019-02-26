import React from 'react'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import ItineraryStore from './ItineraryStore'
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


  render () {
    return (
      <div>
        <Paper elevation={1}>
          <Typography variant='h5' component='h3'>
            Itinerary
          </Typography>
        </Paper>
      </div>
    )
  }
}

export default Itinerary
