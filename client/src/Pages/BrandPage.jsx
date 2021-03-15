import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core";
import Loader from "react-loader-spinner";

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import AddBrand from '../Components/AddBrandDialog/'
import Brand from '../Components/BrandCard/Brand'
import { Schema } from "../Schema/schema.js"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const styles = {
  main: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    boxSizing: 'border-box',
    padding: 50,
  },
  infoText: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 25,
    fontWeight: 600,
    textAlign: 'center',
    height: 120,
    justifyContent: 'space-between'
  },
  brandsContainer: {
    display: 'grid',
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly',
    gridTemplateColumns: 'repeat(4, 300px)'
  }
};

function BrandPage({ classes }) {
  const [brands, setBrands] = useState(null)
  const [deletion, setDeletion] = useState(-1)

  useEffect(() => {
    fetch(`http://localhost:4000/graphql?query=${Schema.getBrands()}`)
      .then(res => res.json())
      .then(res => setBrands(res.data.brands))
  }, [])

  const onDelete = (id) => {
    fetch(`http://localhost:4000/graphql?query=${Schema.deleteBrand(id)}`, { method: 'POST' })
    setBrands(prev => prev.filter(e => e.id !== id))
    setDeletion(-1)
  }

  return (
    <div className={classes.main}>
      {!brands && (
        <div className={classes.infoText}>
          Loading...
          <Loader type="TailSpin" color="black" height={60} width={60} />
        </div>
      )}
      { brands &&
        <div className={classes.brandsContainer}>
          {brands.map(({ id, name, description, type, country, createdAt }, i) =>
            <Brand
              key={i}
              id={id} name={name}
              description={description}
              type={type}
              country={country}
              createdAt={createdAt}
              onDelete={setDeletion}
            />
          )}
          <AddBrand />
        </div>
      }
      <Dialog
        open={deletion !== -1}
        onClose={() => setDeletion(-1)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete this brand ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By clickingthe "Delete" button you'll delete this brand definitely
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeletion(-1)} color="primary">
            No thanks
          </Button>
          <Button onClick={() => onDelete(deletion)} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default withStyles(styles)(BrandPage);
