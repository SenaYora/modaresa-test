import React, { useState } from 'react'
import fetch from 'node-fetch'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import AddBrandDialogContent from './AddBrandDialogContent'

import Inputs from '../../json/inputs.json'
import Types from '../../json/types.json'
import { Schema } from '../../Schema/schema.js'

function AddBrandDialog ({ open, onClose, onAdd }) {
  const [formData, setFormData] = useState({ inputs: {}, types: [...Types] })
  const [inputsError, setInputsError] = useState({})
  const [typesError, setTypesError] = useState(false)

  const checkDataErrors = () => {
    const newInputsError = {}
    let errorOccured = false

    Inputs.forEach(e => {
      if (e.required && (!formData.inputs[e.id] || formData.inputs[e.id] === '')) {
        newInputsError[e.id] = true
        errorOccured = true
      } else { newInputsError[e.id] = false }
    })
    setInputsError(newInputsError)

    const nbChecked = formData.types.reduce((acc, e) => acc + e.checked, 0)

    if (nbChecked === 0) {
      errorOccured = true
      setTypesError(true)
    } else { setTypesError(false) }
    return errorOccured
  }

  const onCloseDialog = () => {
    setInputsError({})
    setTypesError(false)
    onClose()
  }

  const onSumbit = () => {
    if (!checkDataErrors()) {
      const { name, description, country } = formData.inputs
      const types = formData.types.filter(e => e.checked).reduce((acc, e) => [...acc, e.id], [])

      publishForm(name, types, country, description, publishCallback)
    }
  }

  const publishCallback = (data) => {
    onAdd(data.createBrand)
    onClose()
  }

  const publishForm = (name, type, country, description, callback) => {
    fetch(`http://localhost:4000/graphql?query=${Schema.addBrand(name, new Date().getTime(), type, country, description)}`,
      { method: 'POST' }
    )
      .then(res => res.json()).then(res => callback(res.data))
      .catch(console.error)
  }

  return (
    <Dialog open={open} onClose={onCloseDialog} maxWidth={false}>
      {/* Title */}
      <DialogTitle>Add a new brand</DialogTitle>

      {/* Content */}
      <DialogContent>
        <DialogContentText>
          To add a new brand, you have to fulfill few informations about the brand
        </DialogContentText>
        <AddBrandDialogContent
          formData={formData}
          setFormData={setFormData}
          inputsError={inputsError}
          typesError={typesError}
        />
      </DialogContent>

      {/* Actions */}
      <DialogActions>
        <Button onClick={onCloseDialog} color='primary'>Cancel</Button>
        <Button onClick={onSumbit} color='primary'>Add</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddBrandDialog
