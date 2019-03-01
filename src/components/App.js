import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import '../css/App.css'
import AppStore from './AppStore'
import LoginStates from '../LoginStates'
import Landing from './landing/Landing'
import Admin from './admin/Admin'
import UserPage from './userpage/UserPage'
import WithDragDropContext from './WithDragDropContext'

const AdminPage = () => (
  <Admin />
)
const Userpage = () => (
  <UserPage />
)

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

  updateState = () => {
    this.setState(AppStore.getState())
  }

  render () {
    const loggedIn = this.state.loggedInState === LoginStates.loggedIn
    const username = this.state.account && this.state.account.username
    return (
        <div className='App'>
          <Switch>
            <Route exact path='/' render={() => (
              loggedIn
                ? (<Redirect to={`/${username}`} />)
                : (<Landing />)
            )} />
            <Route path='/admin' component={AdminPage} />
            <Route path={`/${username}`} component={Userpage} />
          </Switch>
        </div>
    )
  }
}

export default WithDragDropContext(App)
