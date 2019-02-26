import ActionTypes from '../../ActionTypes'
import { EventEmitter } from 'events'
import dispatcher from '../../Dispatcher'

class SearchAppBarStore extends EventEmitter {
  constructor () {
    super()
  }

  getState () {

  }

  handleActions (action) {
    switch (action.type) {
      case ActionTypes.ACTIONTYPE: {
        this.emit('change')
        break
      }
    }
  }
}

const searchappbarStore = new SearchAppBarStore()
dispatcher.register(searchappbarStore.handleActions.bind(searchappbarStore))
export default searchappbarStore
