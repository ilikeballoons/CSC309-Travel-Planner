import ActionTypes from '../../../ActionTypes'
import { EventEmitter } from 'events'
import dispatcher from '../../../Dispatcher'

class ItineraryStore extends EventEmitter {
  constructor () {
    super()
    this.events = []
  }

  getState () {
    return {
      events: this.events
    }
  }

  handleActions (action) {
    switch (action.type) {
      case ActionTypes.ITINERARY_EVENT_ADD: {
        this.events.push(action.value)
        this.emit('change')
        break
      }

      default:
    }
  }
}

const itineraryStore = new ItineraryStore()
dispatcher.register(itineraryStore.handleActions.bind(itineraryStore))
export default itineraryStore
