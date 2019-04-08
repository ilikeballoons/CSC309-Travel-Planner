import dispatcher from '../../utils/Dispatcher'
import ActionTypes from '../../utils/ActionTypes'
import { getUser } from '../../utils/ServerMethods'

const UserActions = {
  updateUser (user) { // will delete this and the whole file after admin branch merge
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
