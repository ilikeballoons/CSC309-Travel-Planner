import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import '../css/App.css'
import AppStore from './AppStore'
import Landing from './landing/Landing'
import Admin from './admin/Admin'

const LandingPage = () => (
  <Landing />
)

const AdminPage = () => (
  <Admin />
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
    return (
      <div className='App'>
        <Switch>
          <Route path='/' exact component={LandingPage} />
          <Route path='/admin' component={AdminPage} />
        </Switch>
      </div>

    )
  }
}

export default App
