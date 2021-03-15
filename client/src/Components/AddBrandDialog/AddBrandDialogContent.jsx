import React, { Fragment, useEffect, useState } from 'react'
import { withStyles } from '@material-ui/core'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'

import TypesTemplate from '../../json/types.json'

const styles = {
  checkboxContainer: {
    display: 'flex',
    marginTop: 20
  },
  checkbox: {
    margin: '0 10px'
  }
}

function AddBrandDialogContent({ classes, setFormData }) {
  const [types, setTypes] = useState([...TypesTemplate])
  const [inputs, setInputs] = useState({})

  useEffect(() => {
    setTypes(prev => {
      const resetTypes = [...prev]

      resetTypes.forEach(e => e.checked = false)
      return resetTypes
    })
  }, [])

  const onCheckboxChange = (event, index) => {
    const newTypes = [...types]

    newTypes[index].checked = event.target.checked
    setTypes(newTypes)
    updateFormInformations(inputs, newTypes)
  }

  const onInputChange = (event) => {
    const newInputs = { ...inputs, [event.target.id]: event.target.value }
    setInputs(newInputs)
    updateFormInformations(newInputs, types)
  }

  const updateFormInformations = (inputs, types) => {
    setFormData({ ...inputs, types })
  }

  const CheckBoxMap = types.map((e, i) => (
    <div className={classes.checkbox} key={i}>
      <FormControlLabel
        label={e.label}
        control={
          <Checkbox
            checked={e.checked}
            onChange={(event) => onCheckboxChange(event, i)}
            color="primary"
          />
        }
      />
    </div>
  ))

  return (
    <Fragment>
      <TextField
        autoFocus margin="dense"
        id="name" label="Name"
        type="text" required onChange={onInputChange}
      />
      <TextField
        margin="dense"
        id="desciption" label="Desciption"
        type="text" fullWidth multiline onChange={onInputChange}
      />
      <TextField
        margin="dense"
        id="country" label="Country"
        type="text" required onChange={onInputChange}
      />
      <div className={classes.checkboxContainer}>
        {CheckBoxMap}
      </div>
    </Fragment>
  )
}

export default withStyles(styles)(AddBrandDialogContent)