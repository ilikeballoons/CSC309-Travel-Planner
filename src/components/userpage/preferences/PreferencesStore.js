import { EventEmitter } from 'events'
import dispatcher from '../../../utils/Dispatcher'

import ActionTypes from '../../../utils/ActionTypes'
import groupedCategories from '../../../utils/GroupedCategories'

class PreferencesStore extends EventEmitter {
  constructor () {
    super()
    this.open = true
    const { result, toggled } = this.parseCategories(groupedCategories)
    this.preferences = result
    this.toggled = toggled
  }

  getState () {
    return {
      open: this.open,
      preferences: this.preferences,
      toggled: this.toggled
    }
  }

  parseCategories (json) {
    const result = {}
    const toggled = {}
    json.forEach(obj => {
      result[obj.pluralName] = {}
      toggled[obj.pluralName] = false
      obj.categories.forEach(cat => {
        result[obj.pluralName][cat.pluralName] = true
      })
    })
    return { result, toggled }
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

      case ActionTypes.PREFERENCES_CHANGE: {
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

      case ActionTypes.APPBAR_USER_PROFILE_CLOSE: {
        this.open = true
        this.emit('change')
        break
      }

      default:
    }
  }
}

const preferencesStore = new PreferencesStore()
dispatcher.register(preferencesStore.handleActions.bind(preferencesStore))
export default preferencesStore
