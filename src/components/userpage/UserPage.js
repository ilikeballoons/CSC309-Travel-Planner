import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Preferences from './preferences/Preferences'
import Recommendations from './recommendations/Recommendations'
import Itinerary from './itinerary/Itinerary'
import SearchAppBar from '../appbar/SearchAppBar'

const styles = theme => ({
  userpage: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: 20
  },
  hidden: {
    alignSelf: 'flex-start',
    width: 0
  }
})

class UserPage extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <div>
        <SearchAppBar />
        <div className={classes.userpage}>
          <Preferences className={classes.hidden} />
          <Recommendations />
          <Itinerary />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(UserPage)
