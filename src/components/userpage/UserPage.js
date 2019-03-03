import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Preferences from './preferences/Preferences'
import Recommendations from './recommendations/Recommendations'
import Itinerary from './itinerary/Itinerary'
import SearchAppBar from '../appbar/SearchAppBar'

const styles = theme => ({
  userpage: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 20
  }
})

class UserPage extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <div>
        <SearchAppBar />
        <div className={classes.userpage}>
          <Recommendations />
          <Itinerary />
          <Preferences />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(UserPage)
