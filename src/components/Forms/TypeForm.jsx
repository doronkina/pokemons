import React, { useContext, useState } from 'react'
import { useObserver } from 'mobx-react'
import { StoreContext } from '../../App'

const TypeForm = () => {
  const store = useContext(StoreContext)
  const {selectedTypes, changeSelectedTypes, fetchedTypes, setFetchedTypes} = store
  const [filters, setFilters] = useState(false)

  const typeFiltration = e => {
    if(selectedTypes.length) {
      store.getFilteredPokemons(selectedTypes)

      setFilters(!filters)
      setFetchedTypes([...selectedTypes])
    }

    e.preventDefault()
  }

  const clearFilters = () => {
    store.getPokemons()
    store.clearFilters()
  }

  const isCheckedNewTypes = () => {
    if(selectedTypes.length !== fetchedTypes.length){
      return true
    }
    
    const currentArr = selectedTypes.slice().sort()
    const fetchedArr = fetchedTypes.slice().sort()

    for (let i = 0; i < selectedTypes.length; i++) {
      if(currentArr[i] !== fetchedArr[i]) {
        return true
      }
    }

    return false
  }

  return useObserver(() => (
    <>
      <button onClick={() => {setFilters(!filters)}}>Filters</button>
      <div className={filters ? 'filters__open' : 'filters'}>
        <form onSubmit={(e) => { typeFiltration(e) }}>
          <h4>Pokemons Types</h4>
          <div className='filter__container'>
            {store.types.map(type => 
              <label key={type.name}>
                <input type='checkbox' name='type' value={type.name} checked={selectedTypes.indexOf(type.name) !== -1} onChange={() => { changeSelectedTypes(type.name) }} />
                {type.name}
              </label>
            )}
          </div>
          <div className='filter__btns'>
            <button type='submit' disabled={!selectedTypes.length || !isCheckedNewTypes()}>Apply</button>
            <button onClick={clearFilters} disabled={!fetchedTypes.length}>Clear</button>
          </div>
        </form>
      </div>
    </>
  ))
}

export default TypeForm