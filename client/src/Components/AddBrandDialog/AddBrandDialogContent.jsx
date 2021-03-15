import React, { useEffect } from 'react'
import { withStyles } from '@material-ui/core'

import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'

import Inputs from '../../json/inputs.json'
import Types from '../../json/types.json'

const styles = {
  checkboxContainer: {
    display: 'flex',
    marginTop: 20
  },
  checkbox: {
    margin: '0 10px'
  }
}

function AddBrandDialogContent ({ classes, formData, setFormData, inputsError, typesError }) {
  useEffect(() => {
    setFormData(prev => {
      const newTypes = prev.types

      newTypes.forEach(e => { e.checked = false })
      return { inputs: {}, types: newTypes }
    })
  }, [setFormData])

  const onCheckboxChange = (event, index) => {
    const newTypes = [...formData.types]

    newTypes[index].checked = event.target.checked
    setFormData(prev => ({ ...prev, types: newTypes }))
  }

  const onInputChange = (event) => {
    setFormData(prev => ({
      ...prev,
      inputs: {
        ...formData.inputs,
        [event.target.id]: event.target.value
      }
    }))
  }

  const CheckBoxMap = Types.map((e, i) => (
    <div className={classes.checkbox} key={i}>
      <FormControlLabel
        label={e.label}
        control={
          <Checkbox
            checked={e.checked}
            onChange={(event) => onCheckboxChange(event, i)}
            color='primary'
          />
        }
      />
    </div>
  ))

  return (
    <div>
      {Inputs.map((e, i) =>
        <TextField
          key={i} margin='dense' id={e.id} label={e.label}
          type='text' required={e.required} fullWidth={e.fullWidth} autoFocus={e.autofocus}
          onChange={onInputChange} error={inputsError[e.id]}
        />
      )}
      <FormControl required error={typesError} className={classes.checkboxContainer}>
        <FormLabel component='legend'>Types</FormLabel>
        <FormGroup row>
          {CheckBoxMap}
        </FormGroup>
        <FormHelperText>Pick at least one</FormHelperText>
      </FormControl>
    </div>
  )
}

export default withStyles(styles)(AddBrandDialogContent)
