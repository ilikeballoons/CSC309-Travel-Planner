import { EventEmitter } from 'events'
import dispatcher from '../../../utils/Dispatcher'

import ActionTypes from '../../../utils/ActionTypes'
import { findWithAttribute } from '../../../utils/Utils'

class ItineraryStore extends EventEmitter {
  constructor () {
    super()
    this.events = []
    this.name = 'Itinerary'
    this.location = ''
    this.date = Date.now()
    this.saveSnackbarOpen = false
    this.saveSnackbarMessage = ''
    this.selected = -1
  }

  getState () {
    return {
      id: this.id,
      events: this.events,
      name: this.name,
      date: this.date,
      location: this.location,
      existingEvent: this.existingEvent,
      saveSnackbarOpen: this.saveSnackbarOpen,
      saveSnackbarMessage: this.saveSnackbarMessage,
      selected: this.selected
    }
  }

  handleActions (action) {
    switch (action.type) {
      case ActionTypes.ITINERARY_LOAD: {
        const { name, location, date, events, _id } = action.value.itinerary
        this.name = name
        this.location = location
        this.date = date
        this.events = events
        this.id = _id
        this.selected = action.value.selected || action.value.length
        this.emit('change')
        break
      }

      case ActionTypes.ITINERARY_EVENT_ADD: {
        const existingEventIndex = findWithAttribute(this.events, 'hour', action.value.hour)
        if (!isNaN(existingEventIndex)) {  // only allow one event per 'hour'
          this.existingEvent = this.events[existingEventIndex].data
          this.events[existingEventIndex] = action.value
        } else {
          delete this.existingEvent
          this.events.push(action.value)
        }
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

      case ActionTypes.ITINERARY_NAME_CHANGE: {
        this.name = action.value
        this.emit('change')
        break
      }

      case ActionTypes.ITINERARY_PATCH_SUCCESS: {
        this.saveSnackbarMessage = 'Itinerary Successfully Updated!'
        this.saveSnackbarOpen = true
        this.emit('change')
        break
      }

      case ActionTypes.ITINERARY_PATCH_FAILURE: {
        this.saveSnackbarMessage = 'Error! Itinerary NOT Updated!'
        this.saveSnackbarOpen = true
        this.emit('change')
        break
      }

      case ActionTypes.ITINERARY_SAVE_SUCCESS: {
        this.saveSnackbarMessage = 'Itinerary Successfully Saved!'
        this.saveSnackbarOpen = true
        this.emit('change')
        break
      }

      case ActionTypes.ITINERARY_SAVE_FAILURE: {
        this.saveSnackbarMessage = 'Error! Itinerary NOT Saved!'
        this.saveSnackbarOpen = true
        this.emit('change')
        break
      }

      case ActionTypes.USERPROFILE_TOGGLE_ITINERARY_SAVE_SNACKBAR: {
        this.saveSnackbarOpen = action.value
        this.emit('change')
        break
      }

      case ActionTypes.USERPROFILE_ITINERARY_RENAME_CONFIRM: {
        this.name = action.value
        this.emit('change')
        break
      }

      case ActionTypes.SIGNIN_DIALOG_SIGNIN_SUCCESS: {
        this.location = action.value.location
        this.emit('change')
        break
      }

      case ActionTypes.SEARCHBAR_SEARCH: {
        this.location = action.value
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
