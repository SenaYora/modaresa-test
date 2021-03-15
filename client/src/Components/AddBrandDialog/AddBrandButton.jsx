import React from 'react'
import { withStyles } from '@material-ui/core'

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
    WebkitBoxShadow: '0px 0px 5px 2px #000',
    MozBoxShadow: '0px 0px 5px 2px #000',
    boxShadow: '0px 0px 5px 2px #000',
    border: 'none',
    '&:active': {
      WebkitBoxShadow: '0px 0px 5px 2px #000a',
      MozBoxShadow: '0px 0px 5px 2px #000a',
      boxShadow: '0px 0px 5px 2px #000a',
    }
  },
  plusText: {
    fontSize: 50,
    fontWeight: 900
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