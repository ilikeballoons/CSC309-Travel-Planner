import React from 'react'
import SearchAppBar from './SearchAppBar'
import SigninDialog from './SigninDialog'
import CreateAccountDialog from './CreateAccountDialog'
import '../../css/landing/Landing.css'

export default class Landing extends React.Component {
  render () {
    return (
      <div className='landing'>
        <SearchAppBar />
        <div className='landingCenterPanel' />
        <SigninDialog />
        <CreateAccountDialog />
      </div>
    )
  }
}
