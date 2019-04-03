import { EventEmitter } from 'events'
import dispatcher from '../../../utils/Dispatcher'

import ActionTypes from '../../../utils/ActionTypes'
import { findWithAttribute } from '../../../utils/Utils'

class RecommendationsStore extends EventEmitter {
  constructor () {
    super()
    this.recommendations = []
    this.loading = true
    this.fetchedRecommendations = 0
  }

  getState () {
    return {
      recommendations: this.recommendations,
      loading: this.loading,
      fetchedRecommendations: this.fetchedRecommendations
    }
  }

  handleActions (action) {
    switch (action.type) {
      case ActionTypes.RECOMMENDATION_ADD: {
        this.recommendations.push(action.value)
        this.emit('change')
        break
      }

      case ActionTypes.RECOMMENDATION_REMOVE: {
        const existingRecommendationIndex = findWithAttribute(this.recommendations, 'id', action.value.id)
        if (!isNaN(existingRecommendationIndex)) {
          this.recommendations.splice(existingRecommendationIndex, 1)
          // Maintain at least 10 viewable recommendations
          if (this.recommendations.length < 10) {
            this.recommendations = this.recommendations.concat(action.value.formattedVenues)
            this.fetchedRecommendations += 1
          }
        }
        this.loading = false
        this.emit('change')
        break
      }

      case ActionTypes.RECOMMENDATIONS_LOAD: {
        this.recommendations = action.value
        this.fetchedRecommendations = 10
        this.loading = false
        this.emit('change')
        break
      }

      case ActionTypes.SEARCHBAR_SEARCH: {
        this.loading = true
        this.emit('change')
        break
      }

      default:
    }
  }
}

const recommendationsStore = new RecommendationsStore()
dispatcher.register(recommendationsStore.handleActions.bind(recommendationsStore))
export default recommendationsStore
