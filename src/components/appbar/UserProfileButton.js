import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import AccountBox from '@material-ui/icons/AccountBox'

import SearchAppBarActions from './SearchAppBarActions'

const styles = theme => ({
})

class UserProfileButton extends React.Component {
  openUserProfile = () => SearchAppBarActions.openUserProfile()

  render () {
    return (
      <IconButton
        onClick={this.openUserProfile}
        className={this.props.classes.userProfileButton}
        color='inherit'>
        <AccountBox />
      </IconButton>
    )
  }
}

export default withStyles(styles)(UserProfileButton)
