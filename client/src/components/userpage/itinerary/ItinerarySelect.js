import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import { format } from 'date-fns'

import ItineraryActions from './ItineraryActions'
import RecommendationsStore from '../recommendations/RecommendationsStore'
import UserStore from '../../UserStore'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  },
  formControl: {
    minWidth: 120,
    width: '100%'
  }
})

class ItinerarySelect extends React.Component {
  loadItinerary (event) {
    const index = event.target.value
    const { recommendations, fetchedRecommendations } = RecommendationsStore.getState()
    const { user: { location } } = UserStore.getState()

    if (isNaN(index)) return
    // user has no itineraries
    if (index < 0) {
      ItineraryActions.loadItinerary({
        itinerary: {
          events: [],
          name: 'Itinerary',
          date: Date.now(),
          location
        },
        selected: -1,
        rec: { recommendations, fetchedRecommendations }
      })
    } else {
      const itinerary = this.itineraries[index]
      ItineraryActions.loadItinerary({ itinerary, selected: index, rec: { recommendations, fetchedRecommendations } })
    }
  }

  render () {
    const { itineraries, classes, selected } = this.props
    return (
      <form className={classes.root} autoComplete='off' >
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor='itineraries'>Itineraries</InputLabel>
          <Select
            native
            itineraries={itineraries}
            value={selected}
            onChange={this.loadItinerary}
            input={<Input name='itineraries' id='itineraries' fullWidth />}
          >
            <option value='-1'>New</option>
            {itineraries.map((itinerary, index) => (
              <option value={index} key={index}>
                {`${itinerary.name}:\u00A0\u00A0\u00A0\u00A0${itinerary.location}\u00A0\u00A0\u00A0\u00A0${format(new Date(itinerary.date), 'd/M/yyyy')}`} {/* \u00A0 is a breaking space */}
              </option>)
            )}
          </Select>
          <FormHelperText>Choose one of your saved Itineraries</FormHelperText>
        </FormControl>
      </form>
    )
  }
}

export default withStyles(styles)(ItinerarySelect)
