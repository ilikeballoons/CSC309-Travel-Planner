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
    const { currentUser, deleteUser } = AdminStore.getState()
    this.state = { currentUser, deleteUser }
  }

  componentDidMount () {
    AdminStore.on('change', this.updateState)
  }

  componentWillUnmount () {
    AdminStore.removeListener('change', this.updateState)
  }

  updateState = () => {
    const { currentUser, deleteUser } = AdminStore.getState()
    this.setState({ currentUser, deleteUser })
  }

  render () {
    const { currentUser, deleteUser } = this.state
    return (
        <Dialog
          open={deleteUser.open}
          onClose={() => AdminActions.deleteUserDialogCancel()} >
          <DialogTitle>Delete User</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Deleting user will be irreversible. Proceed?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => AdminActions.deleteUserDialogCancel()} color='default'>
              Cancel
            </Button>
            <Button onClick={() => AdminActions.deleteUserDialogSubmit(currentUser)} color='secondary'>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
    )
  }
}

export default DeleteDialog
