import { EventEmitter } from 'events'
import dispatcher from '../../../utils/Dispatcher'

import ActionTypes from '../../../utils/ActionTypes'

class UserProfileStore extends EventEmitter {
  constructor () {
    super()
    this.deleteDialogOpen = false
  }

  getState () {
    return {
      deleteDialogOpen: this.deleteDialogOpen
    }
  }

  handleActions (action) {
    switch (action.type) {
      case ActionTypes.USERPROFILE_TOGGLE_DELETE_ACCOUNT_DIALOG: {
        this.deleteDialogOpen = !this.deleteDialogOpen
        this.emit('change')
        break
      }

      default:
    }
  }
}

const userProfileStore = new UserProfileStore()
dispatcher.register(userProfileStore.handleActions.bind(userProfileStore))
export default userProfileStore
