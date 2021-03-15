import React, { useState } from 'react'
import { withStyles } from '@material-ui/core'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'

import Types from '../../json/types.json'
// import { Schema } from '../../Schema/schema.js'

const styles = {

}

function AddBrandDialog({ classes, open, onClose }) {
  const [types, setTypes] = useState([ ...Types ])

  // const publishForm = (name, type, country, description) => {
  //   fetch(`http://localhost:4000/graphql?query=${Schema.addBrand(name, new Date(), type, country, description)}`, { method: 'POST' })
  // }

  const handleChange = (index) => {
    const newTypes = [ ...types ]

    newTypes[index].checked = !newTypes[index].checked
    setTypes(newTypes)
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add a new brand</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a new brand, you have to fulfill few informations about the brand
        </DialogContentText>
        <TextField
          autoFocus margin="dense"
          id="name" label="Name"
          type="text" fullWidth required
        />
        <TextField
          margin="dense"
          id="desciption" label="Desciption"
          type="text" fullWidth multiline
        />
        <TextField
          margin="dense"
          id="country"
          label="Country"
          type="text"
          required
        />
        <div className={classes.checkboxContainer}>
          {types.map((e, i) =>
            <div className={classes.checkbox} key={i}>
              {e.label}
              <Checkbox
                checked={e.checked}
                onChange={() => handleChange(e)}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </div>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
      </Button>
        <Button onClick={onClose} color="primary">
          Subscribe
      </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withStyles(styles)(AddBrandDialog)