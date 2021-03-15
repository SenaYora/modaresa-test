import React from 'react'
import { withStyles } from '@material-ui/core'

const styles = {
  brandContainer: {
    position: 'relative',
    borderRadius: 20,
    padding: 20,
    boxSizing: 'border-box',
    height: 400,
    margin: '20px 10px',
    backgroundColor: '#f4f4f4',
    WebkitBoxShadow: '0px 0px 5px 0px #000',
    MozBoxShadow: '0px 0px 5px 0px #000',
    boxShadow: '0px 0px 5px 0px #000'
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
    cursor: 'pointer'
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
    fontWeight: 500
  },
  descriptionText: {
    fontSize: 14,
    marginTop: 5
  },
  typeContainer: {
    position: 'absolute',
    fontSize: 15,
    bottom: 20
  },
  typeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  typeText: {
    fontSize: 15,
    marginLeft: 5
  }
}

function Brand ({ classes, id, name, country, type, description, onDelete }) {
  return (
    <div className={classes.brandContainer}>
      <button className={classes.deleteButton} onClick={() => onDelete(id)}>delete</button>
      <div className={classes.nameText}>{name}</div>
      <div className={classes.countryText}>{country}</div>
      <div className={classes.descriptionContainer}>
        Description:
        <div className={classes.descriptionText}>{description || '- No description -'}</div>
      </div>
      <div className={classes.typeContainer}>
        <div className={classes.typeTitle}>Types:</div>
        <div className={classes.typeText}>
          {type.map((e, i) =>
            <div key={i}>
              • {e.charAt(0).toUpperCase() + e.slice(1)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(Brand)
