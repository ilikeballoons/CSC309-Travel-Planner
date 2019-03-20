import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import AppStore from './AppStore'
import LoginStates from '../utils/LoginStates'
import Landing from './landing/Landing'
import Admin from './admin/Admin'
import UserPage from './userpage/UserPage'
import UserProfile from './userpage/profile/UserProfile'
import WithDragDropContext from '../utils/WithDragDropContext'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { account: null }
  }

  componentDidMount () {
    AppStore.on('change', this.updateState)
  }

  componentWillUnmount () {
    AppStore.removeListener('change', this.updateState)
  }

  updateState = () => this.setState(AppStore.getState())

  render () {
    const loggedIn = this.state.loggedInState === LoginStates.loggedIn
    const username = this.state.account && this.state.account.username
    const admin = username === 'admin' && loggedIn
    return (
        <div className='App' style={{'minHeight': '100vh'}}>
          <Switch>
            <Route exact path='/' render={() => (
              !loggedIn
              ? (<Landing />)
              : (<Redirect to={`/${username}`} />)
            )} />
            {!loggedIn && <Redirect to={'/'} />}
            <Route path='/admin' render={() => (
              admin
              ? (<Admin />)
              : (<Redirect to={'/'} />)
            )} />
            <Route exact path={`/${username}`} component={() => <UserPage />} />
            <Route path={`/${username}/profile`} render={() => <UserProfile />} />
          </Switch>
        </div>
    )
  }
}

export default WithDragDropContext(App)
