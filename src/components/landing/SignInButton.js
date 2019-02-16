import React from 'react'
import Button from '@material-ui/core/Button'
// import AccountCircleIcon from '@material-ui/icons/AccountCircle'

export default class SignInButton extends React.Component {
  render () {
    return (
      <Button variant='contained' color='primary' className='signInButton'>
        Sign In
        {/* <AccountCircleIcon /> */}
      </Button>
    )
  }
}
