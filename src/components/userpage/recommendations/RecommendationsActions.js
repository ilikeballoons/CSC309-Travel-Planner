import dispatcher from '../../../utils/Dispatcher'
import ActionTypes from '../../../utils/ActionTypes'

import traverse from 'traverse'
import { foursquare } from '../../../utils/Utils'
import groupedCategories from '../../../utils/GroupedCategories'
import RecommendationsStore from './RecommendationsStore'

const RecommendationsActions = {
  startLoad (city, date) {
    this.city = city
    this.date = new Date(date).getDay()
    this.getRecommendationsFromFoursquare()
      .then(venues => {
        // this.formatVenues(venues) // For release
        this.formatVenuesBasic(venues) // For testing
          .then((formattedVenues) => {
            dispatcher.dispatch({
              type: ActionTypes.RECOMMENDATIONS_LOAD,
              value: formattedVenues
            })
          })
      })
      .catch((err) => console.log(err)) // TODO: SOMETHING BETTER WITH ERRORS
  },
  addRecommendation (event) {
    dispatcher.dispatch({
      type: ActionTypes.RECOMMENDATION_ADD,
      value: event
    })
  },
  removeRecommendation (title, fetchedRecommendations) {
    RecommendationsActions.getOneRecommendationFromFoursquare(fetchedRecommendations)
      .then(venues => (
        // RecommendationsActions.formatVenues(venues))) // For release
        RecommendationsActions.formatVenuesBasic(venues)))// For testing
      .then((formattedVenues) => (
        dispatcher.dispatch({
          type: ActionTypes.RECOMMENDATION_REMOVE,
          value: { title, formattedVenues }
        })
      ))
      .catch((err) => console.log(err)) // TODO: SOMETHING BETTER WITH ERRORS
  },

  // ///////////// FOURSQUARE API CALLS ///////////////

  // You can do this 99500 times per day.
  // *Fetches the initial 10 recommendations*
  getRecommendationsFromFoursquare () {
    const day = this.date
    const city = this.city
    const url = `https://api.foursquare.com/v2/venues/explore?client_id=${foursquare.client_id}&client_secret=${foursquare.client_secret}&v=20190320&limit=10&near=${city}&day=${day}&price=1,2,3,4`
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
  },

  // *Fetches 1 additional recommendation per call*
  getOneRecommendationFromFoursquare (fetchedRecommendations) {
    const day = this.date
    const city = this.city
    const url = `https://api.foursquare.com/v2/venues/explore?client_id=${foursquare.client_id}&client_secret=${foursquare.client_secret}&v=20190320&limit=1&offset=${fetchedRecommendations}&near=${city}&day=${day}&price=1,2,3,4`
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
  },

  // THIS IS A PREMIUM CALL. YOU CAN ONLY DO 50 PER DAY!!!!!
  // *Fetches 1 venue's details per call*
  getVenueDetailsFromFoursquare (venueId) {
    const url = `https://api.foursquare.com/v2/venues/${venueId}/?client_id=${foursquare.client_id}&client_secret=${foursquare.client_secret}&v=20190320`
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((result) => {
          result.json()
            .then(json => resolve(json.response.venue))
        })
        .catch((err) => reject(err))
    })
  },

  // ///////////// CATEGORIZATION METHODS ///////////////

  /*
    Since venue API only gives lowest level category, and there are way too many
    of those to use comfortably in our preferences sidebar, we need to find the
    2nd level category of each venue.
  */
  getVenueParentCategory (venue) {
    // Get the venues primary category
    const primary = venue.categories.filter(cat => cat.primary)[0]
    return this.searchCategories(primary, { categories: groupedCategories })
  },

  searchCategories (query, data) {
    const path = traverse(data).reduce(function (acc, node) {
      if (this.node === query.name && this.key === 'name') acc.push(this.path)
      return acc
    }, [])
    const pathKeys = path[0]
    return {
      category: data[pathKeys[0]][pathKeys[1]].pluralName,
      subcategory: data[pathKeys[0]][pathKeys[1]][pathKeys[2]][pathKeys[3]].pluralName
    }
  },

  // ///////////// FORMATTING METHODS ///////////////

  // Properly formats venue info and returns it; USES premium API calls
  formatVenues (venues) {
    return new Promise((resolve, reject) => {
      Promise.all(venues.map(venue => this.getVenueDetailsFromFoursquare(venue.id)))
        .then(detailedVenues => {
          const formattedVenues = detailedVenues.map(venue => ({
            title: venue.name || 'Name Not Found',
            address: venue.location.address || 'Address Not Found',
            category: this.getVenueParentCategory(venue),
            price: (venue.price && venue.price.tier) || 0,
            description: venue.description || 'No Description Found',
            opens: (venue.hours && venue.hours.timeframes.filter(frame => frame.includesToday)[0].open[0].renderedTime.split('–')[0]) || '0000',
            closes: (venue.hours && venue.hours.timeframes.filter(frame => frame.includesToday)[0].open[0].renderedTime.split('–')[1]) || '0000',
            image: `${venue.bestPhoto.prefix}/height200$/{venue.bestPhoto.suffix}`,
            pluralName: venue.categories[0].pluralName || 'No Category Found'
          }))
          resolve(formattedVenues)
        })
    })
  },

  // Formats only basic venue info; does NOT use a premium API call
  formatVenuesBasic (venues) {
    const formattedVenues = venues.map(venue => ({
      title: venue.name || 'Name Not Found',
      address: venue.location.address || 'Address Not Found',
      category: { category: 'Events', subcategory: 'Other Events' },
      price: 0,
      description: 'No Description Found',
      opens: '0000',
      closes: '0000',
      image: `${venue.categories[0].icon.prefix}bg_88${venue.categories[0].icon.suffix}`,
      pluralName: venue.categories[0].pluralName || 'No Category Found'
    }))

    return Promise.resolve(formattedVenues)
  }
}

export default RecommendationsActions
