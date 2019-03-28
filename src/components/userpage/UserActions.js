import dispatcher from '../../utils/Dispatcher'
import ActionTypes from '../../utils/ActionTypes'

const UserActions = {
  addEvent (event) {
    dispatcher.dispatch({
      type: ActionTypes.ITINERARY_EVENT_ADD,
      value: event
    })
  },
  
  startLoad () {
    dispatcher.dispatch({
      type: ActionTypes.RECOMMENDATIONS_LOAD
    })
  },

  addRecommendation (event) {
    dispatcher.dispatch({
      type: ActionTypes.RECOMMENDATION_ADD,
      value: event
    })
  },

  clear () {
    dispatcher.dispatch({
      type: ActionTypes.ITINERARY_CLEAR
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
  },

  removeEvent (id) {
    dispatcher.dispatch({
      type: ActionTypes.ITINERARY_EVENT_REMOVE,
      value: id
    })
  },

  removeRecommendation (id) {
    dispatcher.dispatch({
      type: ActionTypes.RECOMMENDATION_REMOVE,
      value: id
    })
  }
}

export default UserActions
