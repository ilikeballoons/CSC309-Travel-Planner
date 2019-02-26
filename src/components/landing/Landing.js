import React from 'react'
import SearchBar from './SearchBar'
import SignInButton from './SignInButton'
import SigninDialog from './SigninDialog'
import CreateAccountDialog from './CreateAccountDialog'
import '../../css/landing/Landing.css'

export default class Landing extends React.Component {
  render () {
    return (
      <div className='landing'>
        <div className='signInButtonContainer'>
          <SignInButton />
        </div>
        <div className='landingCenterPanel'>
          <h1>Where to?</h1>
          <SearchBar />
        </div>
        <SigninDialog />
        <CreateAccountDialog />
      </div>
    )
  }
}
