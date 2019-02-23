import dispatcher from '../../../Dispatcher'
import ActionTypes from '../../../ActionTypes'

const PreferencesActions = {
  open () {
    dispatcher.dispatch({
      type: ActionTypes.PREFERENCES_DRAWER_OPEN
    })
  },

  close () {
    dispatcher.dispatch({
      type: ActionTypes.PREFERENCES_DRAWER_CLOSE
    })
  },

  change (selection) {
    dispatcher.dispatch({
      type: ActionTypes.PREFERENCES_DRAWER_CHANGE,
      value: selection
    })
  }
}

export default PreferencesActions
