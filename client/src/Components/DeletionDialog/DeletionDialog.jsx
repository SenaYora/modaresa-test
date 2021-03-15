import React from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

function DeletionDialog ({ deletion, setDeletion, onDelete }) {
  return (
    <Dialog open={deletion !== -1} onClose={() => setDeletion(-1)}>
      <DialogTitle id='alert-dialog-title'>Delete this brand ?</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          By clicking the "Delete" button, you'll delete this brand definitely
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDeletion(-1)} color='secondary'>
          No thanks
        </Button>
        <Button onClick={() => onDelete(deletion)} color='secondary' autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeletionDialog
