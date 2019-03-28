import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import { withStyles } from '@material-ui/core/styles'

import AdminStore from './AdminStore.js'
import AdminActions from './AdminActions.js'

const styles = theme => ({
  usersList: {
    overflow: 'auto',
    alignItems: 'center',
    width: '100%',
    height: '89%',
    maxHeight: '89%'
  }
})

class UsersList extends React.Component {
  constructor () {
    super()
    this.state = {
      allUsers : []
    }
    AdminActions.startLoad()
  }

  componentDidMount () {
    AdminStore.on('change', this.updateState)
  }

  componentWillUnmount () {
    AdminStore.removeListener('change', this.updateState)
  }

  updateState = () => {
    const { allUsers } = AdminStore.getState()
    this.setState({ allUsers })
  }

  render () {
    const { classes } = this.props
    const { allUsers } = this.state
    return (
      <div className={classes.usersList}>
        <List dense>
          {allUsers.map(user => (
            <ListItem key={user.username} button>
              <ListItemAvatar>
                <Avatar
                  src={user.profilePicture}
                />
              </ListItemAvatar>
              <ListItemText primary={user.fullName}
                secondary={user.username}
              />
            </ListItem>
          ))}
        </List>
      </div>
    )
  }
}

export default withStyles(styles)(UsersList)
