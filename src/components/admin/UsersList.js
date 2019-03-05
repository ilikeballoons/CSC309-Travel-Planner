import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import { withStyles } from '@material-ui/core/styles'

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
  render () {
    const { classes } = this.props
    return (
      <div className={classes.usersList}>
        <List dense>
          {[...Array(17).keys()].map(value => (
            <ListItem key={value} button>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={require('../../images/avatar/avatar.png')}
                />
              </ListItemAvatar>
              <ListItemText primary={`Firstnames Lastnames`}
                secondary='@uniqueuserid'
              />
            </ListItem>
          ))}
        </List>
      </div>
    )
  }
}

export default withStyles(styles)(UsersList)
