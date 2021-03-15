import React, { Fragment, useState } from 'react'

import AddBrandButton from './AddBrandButton'
import AddBrandDialog from './AddBrandDialog'

function AddBrand() {
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <AddBrandButton onClick={() => setOpen(prev => !prev)} />
      <AddBrandDialog open={open} onClose={() => setOpen(false)} />
    </Fragment>
  )
}

export default AddBrand