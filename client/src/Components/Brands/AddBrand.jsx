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

import Schema from "../../Schema/schema.js"

const styles = {
  main: {
    width: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  },
  button: {
    borderRadius: '50%',
    width: 80,
    height: 80,
    outline: 'none',
  },
  plusText: {
    fontSize: 50,
    fontWeight: 900
  },
  checkboxContainer: {
    display: 'flex'
  },
  checkbox: {
    marginRight: 15
  }
}

const Types = [
  {
    id: "shoes",
    label: "Shoes",
    checked: false,
  },
  {
    id: "clothes",
    label: "Clothes",
    checked: false,
  },
  {
    id: "bags",
    label: "Bags",
    checked: false,
  },
  {
    id: "hats",
    label: "Hats",
    checked: false,
  },
  {
    id: "accessories",
    label: "Accessories",
    checked: false,
  }
]

function AddBrandComponent({ classes }) {
  const [open, setOpen] = useState(false)
  const [types, setTypes] = useState(Types)

  const publishForm = (name, type, country, description) => {
    fetch(`http://localhost:4000/graphql?query=${Schema.addBrand(name, new Date(), type, country, description)}`, { method: 'POST' })
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (type) => {
    const index = types.findIndex(e => e.id === type.id)
    setTypes(prev => {
      prev[index].checked = true
      return prev
    })
  }

  return (
    <div className={classes.main}>
      <button className={classes.button} onClick={() => setOpen(true)}>
        <div className={classes.plusText}>+</div>
      </button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a new brand</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new brand, you have to fulfill few informations about the brand
            </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            required
          />
          <TextField
            margin="dense"
            id="desciption"
            label="Desciption"
            type="text"
            fullWidth
            multiline
          />
          <TextField
            margin="dense"
            id="country"
            label="Country"
            type="text"
            required
          />
          <div className={classes.checkboxContainer}>
            { types.map((e, i) =>
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default withStyles(styles)(AddBrandComponent)