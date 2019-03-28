// import { EventEmitter } from 'events'
// import dispatcher from '../utils/Dispatcher'
//
// import ActionTypes from '../utils/ActionTypes'
// import { users } from '../utils/Fixtures'
// import { findWithAttribute } from '../utils/Utils'
// import LoginStates from '../utils/LoginStates'
//
// class AppStore extends EventEmitter {
//   constructor () {
//     super()
//     this.user = null
//   }
//
//   getState () {
//     return {
//       user: this.user,
//     }
//   }
//
//   handleActions (action) {
//     switch (action.type) {
//       case ActionTypes.USERPROFILE_EDIT: {
//         const key = Object.keys(action.value)[0]
//         this.user[key] = action.value[key]
//         this.emit('change')
//         break
//       }
//
//       case ActionTypes.USERPROFILE_DELETE_ACCOUNT: {
//         const index = findWithAttribute(users, 'username', this.user.username)
//         this.user = null
//         this.loggedInState = LoginStates.noInput
//         this.dialogText = 'Please input your user information below.'
//         users.splice(index, 1)
//         this.emit('change')
//         break
//       }
//
//       default:
//     }
//   }
// }
//
// const appStore = new AppStore()
// dispatcher.register(appStore.handleActions.bind(appStore))
// export default appStore
