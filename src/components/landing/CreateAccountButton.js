import React from 'react'
import Button from '@material-ui/core/Button'
import LandingActions from './LandingActions'

export default class CreateAccountButton extends React.Component {
  render () {
    return (
      <Button variant='contained' color='default' className='registerButton'
        onClick={() => LandingActions.createAccountOpen()}>
        Register
      </Button>
    )
  }
}
