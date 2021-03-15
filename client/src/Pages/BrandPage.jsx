import React, { useEffect, useState } from 'react'
import { withStyles } from '@material-ui/core'
import fetch from 'node-fetch'
import Loader from 'react-loader-spinner'

import DeletionDialog from '../Components/DeletionDialog/DeletionDialog'
import AddBrand from '../Components/AddBrandDialog/'
import Brand from '../Components/BrandCard/Brand'
import { Schema } from '../Schema/schema.js'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const styles = {
  main: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    boxSizing: 'border-box',
    padding: 50
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
    gridTemplateColumns: 'repeat(auto-fill, 300px)'
  }
}

function BrandPage ({ classes }) {
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

  const addBrand = (newBrand) => {
    setBrands(prev => [...prev, newBrand])
  }

  return (
    <div className={classes.main}>
      {!brands && (
        <div className={classes.infoText}>
          Loading...
          <Loader type='TailSpin' color='black' height={60} width={60} />
        </div>
      )}
      {brands &&
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
          <AddBrand onAdd={addBrand} />
        </div>}
      <DeletionDialog deletion={deletion} setDeletion={setDeletion} onDelete={onDelete} />
    </div>
  )
}

export default withStyles(styles)(BrandPage)
