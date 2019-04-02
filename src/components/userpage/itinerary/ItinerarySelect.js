import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import { format } from 'date-fns'

import ItineraryActions from './ItineraryActions'

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
    if (isNaN(index)) return
    // user has no itineraries
    if (index < 0) {
      ItineraryActions.loadItinerary({
        itinerary: {
          events: [],
          name: 'Itinerary',
          date: Date.now(),
          location: '' // TODO: get this from another store from finnbarr's branch
        },
        selected: -1
      })
    } else {
      const itinerary = this.itineraries[index]
      ItineraryActions.loadItinerary({ itinerary, selected: index })
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
                {`${itinerary.name}: ${format(new Date(itinerary.date), 'd/M/yyyy')}`}
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
