import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import AccountBox from '@material-ui/icons/AccountBox'

import SearchAppBarActions from './SearchAppBarActions'

class UserProfileButton extends React.Component {
  render () {
    return (
      <IconButton
        onClick={() => SearchAppBarActions.userProfileOpen()}
        color='inherit'>
        <AccountBox />
      </IconButton>
    )
  }
}

export default UserProfileButton

