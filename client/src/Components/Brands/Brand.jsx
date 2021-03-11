import React from 'react'
import { withStyles } from '@material-ui/core'

const styles = {
  brandContainer: {
    position: 'relative',
    borderRadius: 20,
    border: '1px solid #101010bb',
    padding: 20,
    boxSizing: 'border-box',
    height: 400,
    margin: '20px 0',
    backgroundColor: '#f4f4f4'
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'black',
    textDecoration: 'underline',
    cursor:'pointer',
  },
  nameText: {
    fontWeight: 700,
    fontSize: 25,
    width: 200,
    whiteSpace: 'nowrap',
    overflow: 'hidden !important',
    textOverflow: 'ellipsis'
  },
  countryText: {
    fontWeight: 600,
    fontSize: 20,
    width: 200,
    whiteSpace: 'nowrap',
    overflow: 'hidden !important',
    textOverflow: 'ellipsis'
  },
  descriptionContainer: {
    marginTop: 25,
    fontWeight: 500,
  },
  descriptionText: {
    fontSize: 14,
    marginTop: 5
  },
  typeText: {
    position: 'absolute',
    fontSize: 15,
    bottom: 20
  }
}

function Brand({ classes, id, name, country, type, description, createdAt, onDelete }) {
  return (
    <div className={classes.brandContainer}>
      <button className={classes.deleteButton} onClick={() => onDelete(id)}>delete</button>
      <div className={classes.nameText}>{name}</div>
      <div className={classes.countryText}>{country}</div>
      <div className={classes.descriptionContainer}>
        Description:
        <div className={classes.descriptionText}>{description}</div>
      </div>
      <div className={classes.typeText}>
        <b>Types:</b> {type.join(', ')}
      </div>
    </div>
  )
}

export default withStyles(styles)(Brand)