import ActionTypes from '../../../utils/ActionTypes'
import { EventEmitter } from 'events'
import dispatcher from '../../../utils/Dispatcher'
import { findWithAttribute } from '../../../utils/Utils'

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
        const existingEventIndex = findWithAttribute(this.events, 'hour', action.value.hour)
        !isNaN(existingEventIndex) // only allow one event per 'hour'
          ? this.events[existingEventIndex] = action.value
          : this.events.push(action.value)
        this.emit('change')
        break
      }

      case ActionTypes.ITINERARY_EVENT_REMOVE: {
        const existingEventIndex = findWithAttribute(this.events, 'id', action.value)
        !isNaN(existingEventIndex) && this.events.splice(existingEventIndex, 1)
        this.emit('change')
        break
      }

      case ActionTypes.ITINERARY_EVENT_INFO_OPEN: {
        const existingEventIndex = findWithAttribute(this.events, 'id', action.value.id)
        this.events[existingEventIndex].anchorEl = action.value.anchorEl
        this.emit('change')
        break
      }

      case ActionTypes.ITINERARY_EVENT_INFO_CLOSE: {
        const existingEventIndex = findWithAttribute(this.events, 'id', action.value.id)
        this.events[existingEventIndex].anchorEl = null
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
