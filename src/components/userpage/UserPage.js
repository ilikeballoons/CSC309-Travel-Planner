import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import '../../css/userpage/UserPage.css'

import Preferences from './preferences/Preferences'
import Recommendations from './Recommendations'
import Itinerary from './itinerary/Itinerary'
import SearchAppBar from '../landing/SearchAppBar'

const styles = theme => ({
  userpage: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 20,
  }
})

class UserPage extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <div>
        <SearchAppBar />
        <div className={classes.userpage}>
          <DragDropContextProvider backend={HTML5Backend}>
            <Recommendations />
            <Itinerary />
          </DragDropContextProvider>
          <Preferences />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(UserPage)
