import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import AdminActions from './AdminActions'
import AdminStore from './AdminStore'

class DeleteDialog extends React.Component {
  constructor () {
    super()
    this.state=AdminStore.getState().deleteUser
  }

  componentDidMount () {
    AdminStore.on('change', this.updateState)
  }

  componentWillUnmount () {
    AdminStore.removeListener('change', this.updateState)
  }

  updateState = () => {
    this.setState(AdminStore.getState().deleteUser)
  }

  render () {
    return (
        <Dialog
          open={this.state.open}
          onClose={() => AdminActions.deleteUserDialogCancel()} >
          <DialogTitle>Delete User</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Deleting user will be irreversible. Proceed?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => AdminActions.deleteUserDialogCancel()} color='primary'>
              Cancel
            </Button>
            <Button onClick={() => AdminActions.deleteUserDialogSubmit()} color='secondary'>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
    )
  }
}

export default DeleteDialog