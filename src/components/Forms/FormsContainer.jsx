import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../../App'
import TypeForm from './TypeForm'
import SelectForm from './SelectForm'
import SearchForm from './SearchForm'

const FormsContainer = () => {
  const store = useContext(StoreContext)
  
  useEffect(() => {
    store.getTypes()
  })
  
  return(
    <>
      <TypeForm />
      <SelectForm />
      <SearchForm />
    </>
  )
}

export default FormsContainer