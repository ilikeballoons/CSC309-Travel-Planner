import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import CalendarToday from '@material-ui/icons/CalendarToday'

import SearchAppBarActions from './SearchAppBarActions'

const styles = theme => ({
})

class UserProfileButton extends React.Component {
  render () {
    return (
      <IconButton
        onClick={() => SearchAppBarActions.userProfileClose()}
        className={this.props.classes.userProfileButton}
        color='inherit'>
        <CalendarToday />
      </IconButton>
    )
  }
}

export default withStyles(styles)(UserProfileButton)
