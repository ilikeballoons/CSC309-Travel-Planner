import ActionTypes from '../ActionTypes'
import { EventEmitter } from 'events'
import dispatcher from '../Dispatcher'

class AppStore extends EventEmitter {
  constructor () {
    super()
    this.account = null
  }

  getState () {
    return {
      account: this.account
    }
  }

  handleActions (action) {
    switch (action.type) {
      case ActionTypes.SIGNIN_DIALOG_SIGNIN_START: {
        this.account = action.value
        console.log (this.account)
        this.emit('change')
        break
      }

      default:
    }
  }
}

const appStore = new AppStore()
dispatcher.register(appStore.handleActions.bind(appStore))
export default appStore
