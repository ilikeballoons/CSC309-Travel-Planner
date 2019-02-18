import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import '../css/App.css'
import Landing from './landing/Landing.js'
import Admin from './admin/Admin.js'

const LandingPage = () => (
  <Landing />
)

const AdminPage = () => (
  <Admin />
)

class App extends Component {
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
