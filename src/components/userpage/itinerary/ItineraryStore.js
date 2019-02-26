import ActionTypes from '../../../ActionTypes'
import { EventEmitter } from 'events'
import dispatcher from '../../../Dispatcher'

class ItineraryStore extends EventEmitter {
  constructor () {
    super()
    // something else
  }

  getState () {
    return {

    }
  }

  handleActions (action) {
    switch (action.type) {

    }
  }
}

const itineraryStore = new ItineraryStore()
dispatcher.register(itineraryStore.handleActions.bind(itineraryStore))
export default itineraryStore
