import React, { useState } from 'react'
import { withStyles } from '@material-ui/core'

import Types from '../../json/types.json'

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

function AddBrandButton({ classes, onClick }) {
  return (
    <div className={classes.main}>
      <button className={classes.button} onClick={onClick}>
        <div className={classes.plusText}>+</div>
      </button>
    </div>
  )
}

export default withStyles(styles)(AddBrandButton)