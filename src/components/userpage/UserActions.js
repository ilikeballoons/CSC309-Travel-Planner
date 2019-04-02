import dispatcher from '../../utils/Dispatcher'
import ActionTypes from '../../utils/ActionTypes'
import { getUser } from '../../utils/ServerMethods'

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

  removeRecommendation (id) {
    dispatcher.dispatch({
      type: ActionTypes.RECOMMENDATION_REMOVE,
      value: id
    })
  },

  updateUser (user) {
    getUser(user)
      .then((user) => {
        dispatcher.dispatch({
          type: ActionTypes.UPDATE_USER,
          value: user
        })
      })
  }
}

export default UserActions
