import ActionTypes from '../../../ActionTypes'
import { EventEmitter } from 'events'
import dispatcher from '../../../Dispatcher'
import { findWithAttribute } from '../../../Utils'
import { recommendations } from '../../../Fixtures'

class RecommendationsStore extends EventEmitter {
  constructor () {
    super()
    this.recommendations = recommendations
  }

  getState () {
    return {
      recommendations: this.recommendations
    }
  }

  // get state of a particular event () {}

  handleActions (action) {
    switch (action.type) {
      case ActionTypes.RECOMMENDATION_REMOVE: {
        const existingRecommendationIndex = findWithAttribute(this.recommendations, 'id', action.value)
        !isNaN(existingRecommendationIndex) && this.recommendations.splice(existingRecommendationIndex, 1)
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