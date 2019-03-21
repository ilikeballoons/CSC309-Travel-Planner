import { EventEmitter } from 'events'
import traverse from 'traverse'
import dispatcher from '../../../utils/Dispatcher'

import ActionTypes from '../../../utils/ActionTypes'
import { findWithAttribute } from '../../../utils/Utils'
// import { recommendations } from '../../../utils/Fixtures'
import { foursquare } from '../../../utils/Utils'
import * as data from '../../../utils/Categories.json'
import venues from '../../../utils/JSON/MegaVenue'


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

  getRecommendationsFromTestFile = () => {
    return new Promise((resolve, reject) => {
      const json = require('../../../utils/JSON/Recommendations.json')
      const items = json.response.groups[0].items
      resolve(items.map(item => item.venue))
    })
  }

  getVenueDetailsFromTestFiles = (venueId) => {
    return new Promise((resolve, reject) => {
      const index = findWithAttribute(venues, 'id', venueId)
      const venue = venues[index]
      resolve(venue)
    })
  }

  // You can do this 99500 times per day.
  // getRecommendationsFromFoursquare = () => {
  //   // TODO: maybe add something here to get the user's location
  //   const url = `https://api.foursquare.com/v2/venues/explore?client_id=${foursquare.client_id}&client_secret=${foursquare.client_secret}&v=20190320&limit=10&near=Toronto, ON&price=1,2,3,4`
  //   return new Promise((resolve, reject) => {
  //     fetch(url)
  //     .then((result) => {
  //       result.json().then(json => {
  //         const items = json.response.groups[0].items
  //         resolve(items.map(item => item.venue))
  //       })
  //     })
  //     .catch((err) => reject(err))
  //   })
  // }

  // THIS IS A PREMIUM CALL. YOU CAN ONLY DO 50 PER DAY!!!!!
  // getVenueDetailsFromFoursquare = (venueId) => {
  //   const url = `https://api.foursquare.com/v2/venues/${venueId}/?client_id=${foursquare.client_id}&client_secret=${foursquare.client_secret}&v=20190320`
  //   return new Promise((resolve, reject) => {
  //     fetch(url)
  //     .then((result) => {
  //       result.json()
  //       .then(json => resolve(json.response.venue))
  //     })
  //     .catch((err) => reject(err))
  //   })
  // }

  /*
    Since venue API only gives lowest level category, and there are way too many
    of those to use comfortably in our preferences sidebar, we need to find the
    2nd level category of each venue.
  */
  getVenueParentCategory = (venue) => {
    // Get the venues primary category
    const primary = venue.categories.filter(cat => cat.primary)[0]
    return this.searchCategories(primary, {categories: data.categories})
  }

  searchCategories = (query, data) => {
    const path =  traverse(data).reduce(function (acc, node) {
      if (this.node === query.name && this.key === 'name') acc.push(this.path)
      return acc
    }, [])
    const pathKeys = path[0]
    return data[pathKeys[0]][pathKeys[1]].name
    }

  // // Returns a category object which is the parent of the given category from the array of categories 'categories'
  // searchCategory = (query, target) => {
  //   if (query.name === target.name) { // category is a leaf
  //       console.log(target);
  //       return target
  //   }
  //   else { // category is an interior node
  //     target.categories.forEach((subcategory) => {
  //       return this.searchCategory(query, subcategory)
  //     })
  //   }
  // }

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
        // this.getRecommendationsFromFoursquare()
        this.getRecommendationsFromTestFile()
        .then((venues) => {
          Promise.all(venues.map(venue => (
            // this.getVenueDetailsFromFoursquare(venue.id)
            this.getVenueDetailsFromTestFiles(venue.id)
          )))
          .then(detailedVenues => {
            const formattedVenues = detailedVenues.map(venue => ({
                title: venue.name || 'Name Not Found',
                address: venue.location.address || 'Address Not Found',
                category: this.getVenueParentCategory(venue),
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
