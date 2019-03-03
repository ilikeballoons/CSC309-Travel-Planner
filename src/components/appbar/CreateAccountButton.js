import React from 'react'
import Button from '@material-ui/core/Button'
import SearchAppBarActions from './SearchAppBarActions'

export default class CreateAccountButton extends React.Component {
  render () {
    return (
      <Button variant='contained' color='default'
        onClick={() => SearchAppBarActions.createAccountOpen()}>
        Register
      </Button>
    )
  }
}
