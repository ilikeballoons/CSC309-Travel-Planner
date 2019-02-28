import dispatcher from '../../Dispatcher'
import ActionTypes from '../../ActionTypes'

const UserActions = {
  clear () {
    dispatcher.dispatch({
      type: ActionTypes.ITINERARY_CLEAR
    })
  },
  addEvent (event) {
    dispatcher.dispatch({
      type: ActionTypes.ITINERARY_EVENT_ADD,
      value: event
    })
  },
  removeEvent (event) {
    dispatcher.dispatch({
      type: ActionTypes.ITINERARY_EVENT_REMOVE,
      value: event
    })
  }
}

export default UserActions
