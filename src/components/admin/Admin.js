import React from 'react'
import UsersList from './UsersList.js'
import UsersSearch from './UsersSearch.js'
import UserPanel from './UserPanel.js'
import PasswordDialog from './PasswordDialog.js'
import DeleteDialog from './DeleteDialog.js'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import landingPageBg from '../../images/landingPageBg.jpg'

const styles = theme => ({
  admin: {
    minHeight: '100vh',
    backgroundImage: `url('${landingPageBg}')`,
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center'
  },
  adminViewPaper: {
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    width: '90vw',
    height: '90vh',
    maxHeight: '90vh'
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
