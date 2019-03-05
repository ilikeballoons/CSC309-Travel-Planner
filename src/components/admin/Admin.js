import React from 'react'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import SearchAppBar from '../appbar/SearchAppBar'
import { withStyles } from '@material-ui/core/styles'

import DeleteDialog from './DeleteDialog.js'
import PasswordDialog from './PasswordDialog.js'
import UsersList from './UsersList.js'
import UserPanel from './UserPanel.js'
import UsersSearch from './UsersSearch.js'
import landingPageBg from '../../images/landingPageBg.jpg'

const styles = theme => ({
  admin: {
    minHeight: '100vh',
    backgroundImage: `url('${landingPageBg}')`,
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  adminViewPaper: {
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    width: '90vw',
    height: '80vh',
    maxHeight: '80vh'
  },
  adminListView: {
    height: '100%',
    width: '33%',
    borderRight: '1px solid #bdbdbd',
    padding: [[0, 5]]
  }
})

class Admin extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <div className={classes.admin}>
        <SearchAppBar page='admin' />
        <Paper className={classes.adminViewPaper}>
          <div className={classes.adminListView}>
            <UsersSearch />
            <Divider />
            <UsersList />
          </div>
          <UserPanel />
          <PasswordDialog />
          <DeleteDialog />
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(Admin)
