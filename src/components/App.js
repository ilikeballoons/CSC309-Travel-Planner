import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

// import AppStore from './AppStore'
import SearchAppBarStore from './appbar/SearchAppBarStore'
import { LoginStates } from '../utils/Utils'
import Landing from './landing/Landing'
import Admin from './admin/Admin'
import UserPage from './userpage/UserPage'
import UserProfile from './userpage/profile/UserProfile'
import WithDragDropContext from '../utils/WithDragDropContext'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { username: null }
  }

  componentDidMount () {
    SearchAppBarStore.on('change', this.updateState)
  }

  componentWillUnmount () {
    SearchAppBarStore.removeListener('change', this.updateState)
  }

  updateState = () => this.setState(SearchAppBarStore.getState().login)

  render () {
    const { username, loggedInState, privilege } = this.state
    const loggedIn = loggedInState === LoginStates.loggedIn
    const admin = (privilege === 1)
    return (
        <div className='App' style={{'minHeight': '100vh'}}>
          <Switch>
            <Route exact path='/' render={() => (
              !loggedIn
              ? (<Landing />)
              : loggedIn && admin
                ? (<Admin />)
                : (<Redirect to={`/${username}`} />)
            )} />
            {!loggedIn && <Redirect to={'/'} />}
            <Route exact path={`/${username}`} component={() => <UserPage />} />
            <Route path={`/${username}/profile`} render={() => <UserProfile />} />
          </Switch>
        </div>
    )
  }
}

export default WithDragDropContext(App)
