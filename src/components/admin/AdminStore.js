import { EventEmitter } from 'events'
import dispatcher from '../../utils/Dispatcher'
import ActionTypes from '../../utils/ActionTypes'

class AdminStore extends EventEmitter {
  constructor () {
    super()
    this.userQuery = ''

    this.allUsers = []
    this.currentUser = {}
    this.editModeOn = false
    this.editModeSave = false

    this.changePW = {
      open: false,
      submit: false,
      password: '',
      retype: ''
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
      currentUser: this.currentUser,
      editModeOn: this.editModeOn,
      changePW: this.changePW,
      deleteUser: this.deleteUser
    }
  }

  getUsersFromFile () {
    return new Promise((resolve, reject) => {
      const fixture = require('../../utils/Fixtures.js')
      this.allUsers = fixture.users
      this.currentUser = this.allUsers[0]
      resolve()
    })
  }

  editUser () {
    return new Promise((resolve, reject) => {
      const fixture = require('../../utils/Fixtures.js')
      fixture.updateUser(this.currentUser)
      resolve()
    })
  }

  deleteUserExecute () {
    return new Promise((resolve, reject) => {
      const fixture = require('../../utils/Fixtures.js')
      fixture.deleteUser(this.currentUser)
      this.deleteUser.delete = false
      resolve()
    })
  }

  filterUsers (query) {
    return new Promise((resolve, reject) => {
      const fixture = require('../../utils/Fixtures.js')
      this.allUsers = fixture.filterUsers(query)
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

      // TODO: this was called once clicked on save
      case ActionTypes.ADMIN_EDIT_USER_CANCEL: {
        this.editModeOn = false
        this.editModeSave = true

        // this.editUser().then((r) => {}).catch((e) => console.log(e)) //TODO: change this funciton calling the backend method, editUser is also in this file

        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_EDIT_USER_MISC: {
        this.currentUser.description = action.value
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_EDIT_USER_LOCATION: {
        this.currentUser.location = action.value
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_EDIT_USER_BIRTHDAY: {
        this.currentUser.birthday = action.value
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
        this.deleteUser.delete = false
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_DELETE_DIALOG_SUBMIT: {
        this.deleteUser = {
          open: false,
          delete: true
        }
        this.deleteUserExecute().then(r => {
          this.getUsersFromFile()
        }).then(reload => {
          console.log('Reloaded')
          this.emit('change')
        }).catch(error => {
          console.log('Logging from inside: ', error)
        })
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_USER_LOAD: {
        this.allUsers = action.value
        this.emit('change')
        break
      }

      case ActionTypes.ADMIN_CHANGE_USER_DISPLAYED: {
        this.currentUser = action.value
        this.emit('change')
        break
      }

      case ActionTypes.USERSEARCH_CHANGE: {
        this.userQuery = action.value.query
        this.allUsers = action.value.res
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
