import ActionTypes from '../../../ActionTypes'
import { EventEmitter } from 'events'
import dispatcher from '../../../Dispatcher'
import * as data from '../../../Categories.json'

class PreferencesStore extends EventEmitter {
  constructor () {
    super()
    this.open = true
    const { result, toggled } = this.parseCategories(data.response.categories)
    this.preferences = result
    this.toggled = toggled
  }

  parseCategories (json) {
    const result = {}
    const toggled = {}
    json.forEach(obj => {
      result[obj.pluralName] = {}
      toggled[obj.pluralName] = false
      obj.categories.forEach(cat => {
        result[obj.pluralName][cat.pluralName] = false
      })
    })
    return { result, toggled }
  }

  getState () {
    return {
      open: this.open,
      preferences: this.preferences,
      toggled: this.toggled
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

      case ActionTypes.PREFERENCES_TOGGLE_CATEGORY: {
        this.toggled[action.value] = !this.toggled[action.value]
        this.emit('change')
        break
      }
    }
  }
}

const preferencesStore = new PreferencesStore()
dispatcher.register(preferencesStore.handleActions.bind(preferencesStore))
export default preferencesStore
