import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import CalendarToday from '@material-ui/icons/CalendarToday'

import SearchAppBarActions from './SearchAppBarActions'
import RecommendationsActions from '../userpage/recommendations/RecommendationsActions'

class UserProfileButton extends React.Component {
  render () {
    const { searchQuery, travelDate } = this.props
    return (
      <IconButton
        onClick={() => {
          SearchAppBarActions.userProfileClose()
          RecommendationsActions.startLoad(searchQuery, travelDate)
        }}
        color='inherit'>
        <CalendarToday />
      </IconButton>
    )
  }
}

export default UserProfileButton

