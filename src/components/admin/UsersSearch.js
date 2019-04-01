import React from 'react'
import Input from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

import { withStyles } from '@material-ui/core/styles'

import AdminActions from './AdminActions'
import AdminStore from './AdminStore'

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
  constructor () {
    super()
    const { userQuery } = AdminStore.getState()
    this.state = { userQuery }
  }

  componentDidMount () {
    AdminStore.on('change', this.updateState)
  }

  componentWillUnmount () {
    AdminStore.removeListener('change', this.updateState)
  }

  updateState = () => {
    const { userQuery } = AdminStore.getState()
    this.setState({userQuery})
  }

  updateQuery = event => AdminActions.userSearchChange(event.target.value)

  render () {
    const { classes } = this.props
    const { userQuery } = this.state
    return (
      <div className={classes.adminSearchBar}>
        <Input className={classes.adminSearchField}
          placeholder='Search for users'
          value = {userQuery}
          onChange={this.updateQuery} />
        <IconButton className={classes.userSearchBtn}>
          <SearchIcon />
        </IconButton>
      </div>
    )
  }
}

export default withStyles(styles)(UsersSearch)
