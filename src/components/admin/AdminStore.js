import { EventEmitter } from 'events'
import dispatcher from '../../utils/Dispatcher'
import ActionTypes from '../../utils/ActionTypes'

class AdminStore extends EventEmitter {
  constructor () {
    super()
    this.userQuery = ''
    this.allUsers = []
    this.userDisplayed = 'user'
    this.changePW = {
      open: false,
      submit: false,
      password: '',
      retype: ''
    }
    this.editModeOn = false
    this.editModeSave = false
    this.editUser = {
      birthday: '1991-11-11',
      location: 'Florida, USA',
      currency: {
        value: 'USD',
        label: '$'
      },
      misc: ''
    }
    this.deleteUser = {
      open: false,
      delete: false
    }
  }

  getState () {
    return {
      allUsers: this.allUsers,
      userQuery: this.userQuery,
      userDisplayed: this.allUsers.filter(user => user.username === this.userDisplayed)[0],
      changePW: this.changePW,
      editUser: this.editUser,
      editModeOn: this.editModeOn,
      deleteUser: this.deleteUser
    }
  }

  getUsersFromFile () {
    return new Promise((resolve, reject) => {
      const fixture = require('../../utils/Fixtures.js')
      this.allUsers = fixture.users
      resolve()
    })
  }

  handleActions (action) {
    switch (action.type) {
      case ActionTypes.ADMIN_CHANGE_PW_OPEN: {
        this.changePW.open = true
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_CHANGE_PW_CANCEL: {
        this.changePW = {
          open: false,
          submit: false,
          password: '',
          retype: ''
        }
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_CHANGE_PW_CLICK_SUBMIT: {
        this.changePW.submit = true
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_CHANGE_PW_SUBMIT: {
        this.changePW = action.value
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_CHANGE_PW_PASSWORD: {
        this.changePW.password = action.value
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_CHANGE_PW_RETYPE: {
        this.changePW.retype = action.value
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_EDIT_USER_ON: {
        this.editModeOn = true
        this.editModeSave = false
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_EDIT_USER_CANCEL: {
        this.editModeOn = false
        this.editModeSave = true
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_EDIT_USER_CURRENCY: {
        this.editUser.currency = action.value
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_EDIT_USER_MISC: {
        this.editUser.misc = action.value
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_EDIT_USER_LOCATION: {
        this.editUser.location = action.value
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_EDIT_USER_BIRTHDAY: {
        this.editUser.birthday = action.value
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_DELETE_DIALOG_OPEN: {
        this.deleteUser.open = true
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_DELETE_DIALOG_CANCEL: {
        this.deleteUser.open = false
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_DELETE_DIALOG_SUBMIT: {
        this.deleteUser = {
          open: false,
          delete: true
        }
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_USER_LOAD: {
        this.getUsersFromFile().then((result) => {
          // console.log('Loaded User')
          this.emit('change')
        }).catch((err) => {
          console.log(err)
        })
        break
      }

      case ActionTypes.ADMIN_CHANGE_USER_DISPLAYED: {
        this.userDisplayed = action.value
        this.emit('change')
        break
      }

      default:
    }
  }
}

const adminStore = new AdminStore()
dispatcher.register(adminStore.handleActions.bind(adminStore))
export default adminStore
