import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import CalendarToday from '@material-ui/icons/CalendarToday'

import SearchAppBarActions from './SearchAppBarActions'
import RecommendationsActions from '../userpage/recommendations/RecommendationsActions'

const styles = theme => ({
})

class UserProfileButton extends React.Component {
  render () {
  	 const { searchQuery, travelDate } = this.props
    return (
      <IconButton
        onClick={() => {
        	 SearchAppBarActions.userProfileClose()
        	 RecommendationsActions.startLoad(searchQuery, travelDate)
        }}
        className={this.props.classes.userProfileButton}
        color='inherit'>
        <CalendarToday />
      </IconButton>
    )
  }
}

export default withStyles(styles)(UserProfileButton)
