import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Preferences from './preferences/Preferences'
import Recommendations from './recommendations/Recommendations'
import Itinerary from './itinerary/Itinerary'
import SearchAppBar from '../appbar/SearchAppBar'
import UserProfile from './profile/UserProfile.js'
import AppStore from '../AppStore.js'
import SearchAppBarStore from '../appbar/SearchAppBarStore.js'

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
  constructor () {
    super()
    this.state = {
      user: AppStore.getState().user,
      userProfileOpen: SearchAppBarStore.getState().userProfile.open
    }
  }

  componentDidMount () {
    AppStore.on('change', this.updateState)
    SearchAppBarStore.on('change', this.updateState)
  }

  componentWillUnmount () {
    AppStore.removeListener('change', this.updateState)
    SearchAppBarStore.removeListener('change', this.updateState)
  }

  updateState = () => {
    this.setState({
      user: AppStore.getState().user,
      userProfileOpen: SearchAppBarStore.getState().userProfile.open
    })
  }

  render () {
    const { classes } = this.props
    const { userProfileOpen, user } = this.state
    return (
      <div>
        <SearchAppBar />
        <div className={classes.userpage}>
          <Preferences className={classes.hidden} />
          <Recommendations />
          <Itinerary />
        </div>
        <UserProfile user={user} open={userProfileOpen}/>
      </div>
    )
  }
}

export default withStyles(styles)(UserPage)
