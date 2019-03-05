import dispatcher from '../../utils/Dispatcher'
import ActionTypes from '../../utils/ActionTypes'

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
  removeEvent (id) {
    dispatcher.dispatch({
      type: ActionTypes.ITINERARY_EVENT_REMOVE,
      value: id
    })
  },
  addRecommendation (event) {
    dispatcher.dispatch({
      type: ActionTypes.RECOMMENDATION_ADD,
      value: event
    })
  },
  removeRecommendation (id) {
    dispatcher.dispatch({
      type: ActionTypes.RECOMMENDATION_REMOVE,
      value: id
    })
  },
  infoOpen (info) {
    dispatcher.dispatch({
      type: ActionTypes.ITINERARY_EVENT_INFO_OPEN,
      value: info
    })
  },
  infoClose (info) {
    dispatcher.dispatch({
      type: ActionTypes.ITINERARY_EVENT_INFO_CLOSE,
      value: info
    })
  }
}

export default UserActions
