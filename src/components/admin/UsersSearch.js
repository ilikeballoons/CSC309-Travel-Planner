import React from 'react'
import Input from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  adminSearchBar: {
    margin: 'auto',
    width: '100%',
    height: '10%'
  },
  adminSearchField: {
    marginLeft: '5%',
    marginTop: '5%',
    width: '75%',
    flex: 1
  },
  userSearchBtn: {
    padding: 10
  }
})

class UsersSearch extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <div className={classes.adminSearchBar}>
        <Input className={classes.adminSearchField}
          placeholder='Search for users' />
        <IconButton className={classes.userSearchBtn}>
          <SearchIcon />
        </IconButton>
      </div>
    )
  }
}

export default withStyles(styles)(UsersSearch)
