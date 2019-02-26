import ActionTypes from '../../ActionTypes'
import { EventEmitter } from 'events'
import dispatcher from '../../Dispatcher'

class SearchAppBarStore extends EventEmitter {
  constructor () {
    super()
    this.searchQuery = ''
  }

  getState () {
    return { searchQuery: this.searchQuery }
  }

  handleActions (action) {
    switch (action.type) {
      case ActionTypes.SEARCHBAR_CHANGE: {
        this.searchQuery = action.value
        this.emit('change')
        break
      }

      case ActionTypes.SEARCHBAR_SEARCH: {
        console.log('search!: ', action)
        // Charlie, add stuff here
        break
      }
    }
  }
}

const searchappbarStore = new SearchAppBarStore()
dispatcher.register(searchappbarStore.handleActions.bind(searchappbarStore))
export default searchappbarStore
