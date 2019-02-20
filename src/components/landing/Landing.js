import React from 'react'
import SearchBar from './SearchBar.js'
import SignInButton from './SignInButton.js'
import SigninDialog from './SigninDialog.js'
import '../../css/landing/Landing.css'
import LandingActions from './LandingActions'

export default class Landing extends React.Component {
  constructor (props) {
    super(props)
    this.state = { open: false }
  }

  render () {
    return (
      <div className='landing'>
        <div className='signInButtonContainer'>
          <SignInButton
            onClick={() => LandingActions.signinDialogOpen()} />
        </div>
        <div className='landingCenterPanel'>
          <h1>Where to?</h1>
          <SearchBar />
        </div>
        <SigninDialog onClose={() => LandingActions.signinDialogClose()} />
      </div>
    )
  }
}
