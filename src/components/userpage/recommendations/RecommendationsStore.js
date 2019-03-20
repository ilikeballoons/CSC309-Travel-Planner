import { EventEmitter } from 'events'
import dispatcher from '../../../utils/Dispatcher'

import ActionTypes from '../../../utils/ActionTypes'
import { findWithAttribute } from '../../../utils/Utils'
// import { recommendations } from '../../../utils/Fixtures'
import { foursquare } from '../../../utils/Utils'


class RecommendationsStore extends EventEmitter {
  constructor () {
    super()
    this.recommendations = []
    this.loading = true
  }

  getState () {
    return {
      recommendations: this.recommendations,
      loading: this.loading
    }
  }

  getRecommendationsFromFoursquare = () => {
    // TODO: maybe add something here to get the user's location
    const url = `https://api.foursquare.com/v2/venues/explore?client_id=${foursquare.client_id}&client_secret=${foursquare.client_secret}&v=20190320&limit=10&near=Toronto, ON&price=1,2,3,4`
    return new Promise((resolve, reject) => {
      fetch(url)
      .then((result) => {
        result.json().then(json => {
          const items = json.response.groups[0].items
          resolve(items.map(item => item.venue))
        })
      })
      .catch((err) => reject(err))
    })
  }

  getVenueDetailsFromFoursquare = (venueId) => {
    const url = `https://api.foursquare.com/v2/venues/${venueId}/?client_id=${foursquare.client_id}&client_secret=${foursquare.client_secret}&v=20190320`
    return new Promise((resolve, reject) => {
      fetch(url)
      .then((result) => {
        result.json()
        .then(json => resolve(json.response.venue))
      })
      .catch((err) => reject(err))
    })
  }

  handleActions (action) {
    switch (action.type) {
      case ActionTypes.RECOMMENDATION_ADD: {
        this.recommendations.push(action.value)
        this.emit('change')
        break
      }

      case ActionTypes.RECOMMENDATION_REMOVE: {
        const existingRecommendationIndex = findWithAttribute(this.recommendations, 'id', action.value)
        !isNaN(existingRecommendationIndex) && this.recommendations.splice(existingRecommendationIndex, 1)
        this.emit('change')
        break
      }

      case ActionTypes.RECOMMENDATIONS_LOAD: {
        this.getRecommendationsFromFoursquare()
        .then((venues) => {
          Promise.all(venues.map(venue => (
            this.getVenueDetailsFromFoursquare(venue.id)
          )))
          .then(detailedVenues => {
            const formattedVenues = detailedVenues.map(venue => ({
                title: venue.name,
                address: venue.location.address,
                price: (venue.price && venue.price.tier) || 0,
                // description: venue.description
                opens: (venue.hours && venue.hours.timeframes.filter(frame => frame.includesToday)[0].open[0].renderedTime.split('–')[0]) || '0000', // vomit
                closes: (venue.hours && venue.hours.timeframes.filter(frame => frame.includesToday)[0].open[0].renderedTime.split('–')[1]) || '0000',
                image: `${venue.bestPhoto.prefix}width300${venue.bestPhoto.suffix}`
            }))
            this.recommendations = formattedVenues
            this.loading = false
            this.emit('change')
          })
        })
        .catch((err) => console.log (err)) // TODO: SOMETHING BETTER WITH ERRORS
        break
      }

      default:
    }
  }
}

const recommendationsStore = new RecommendationsStore()
dispatcher.register(recommendationsStore.handleActions.bind(recommendationsStore))
export default recommendationsStore
