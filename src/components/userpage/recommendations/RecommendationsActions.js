import dispatcher from '../../../utils/Dispatcher'
import ActionTypes from '../../../utils/ActionTypes'

const RecommendationsActions = {
  startLoad () {
    dispatcher.dispatch({
      type: ActionTypes.RECOMMENDATIONS_LOAD
    })
  }
}

export default RecommendationsActions
