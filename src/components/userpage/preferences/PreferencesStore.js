import ActionTypes from '../../../ActionTypes'
import { EventEmitter } from 'events'
import dispatcher from '../../../Dispatcher'

class PreferencesStore extends EventEmitter {
  constructor () {
    super()
    this.open = true
    this.preferences = {
      sightseeing: {
        historical: false,
        art: false,
        museums: false,
        government: false,
        beaches: false,
        shopping: false
      },

      tours: {
        walking: false,
        biking: false,
        driving: false,
        nature: false,
        architectural: false,
        cultural: false
      },

      food: {
        restaurants: false,
        bars: false,
        breweries: false
      },

      events: {
        theatre: false,
        concerts: false,
        sports: false
      }
    }
  }

  getState () {
    return {
      open: this.open,
      preferences: this.preferences
    }
  }

  findKey (key) {
    let result
    Object.keys(this.preferences).forEach(category => {
      Object.keys(this.preferences[category]).forEach(type => {
        if (key === type) result = category
      })
    })
    return result
  }

  handleActions (action) {
    switch (action.type) {
      case ActionTypes.PREFERENCES_DRAWER_OPEN: {
        this.open = true
        this.emit('change')
        break
      }

      case ActionTypes.PREFERENCES_DRAWER_CLOSE: {
        this.open = false
        this.emit('change')
        break
      }

      case ActionTypes.PREFERENCES_DRAWER_CHANGE: {
        const key = this.findKey(Object.keys(action.value)[0])
        Object.assign(this.preferences[key], action.value)
        this.emit('change')
        break
      }
    }
  }
}

const preferencesStore = new PreferencesStore()
dispatcher.register(preferencesStore.handleActions.bind(preferencesStore))
export default preferencesStore
