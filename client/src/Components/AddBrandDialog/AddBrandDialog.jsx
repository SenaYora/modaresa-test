import React, { useEffect, useState } from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import AddBrandDialogContent from './AddBrandDialogContent'

// import { Schema } from '../../Schema/schema.js'

function AddBrandDialog({ open, onClose }) {
  const [formData, setFormData] = useState({})

  useEffect(() => {
    console.log(formData)
  }, [formData])

  // const publishForm = (name, type, country, description) => {
  //   fetch(`http://localhost:4000/graphql?query=${Schema.addBrand(name, new Date(), type, country, description)}`, { method: 'POST' })
  // }

  return (
    <Dialog open={open} onClose={onClose} maxWidth={false}>
      {/* Title */}
      <DialogTitle>Add a new brand</DialogTitle>

      {/* Content */}
      <DialogContent>
        <DialogContentText>
          To add a new brand, you have to fulfill few informations about the brand
        </DialogContentText>
        <AddBrandDialogContent setFormData={setFormData} />
      </DialogContent>

      {/* Actions */}
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={onClose} color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddBrandDialog