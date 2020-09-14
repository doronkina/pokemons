import React, { useContext } from 'react'
import { useObserver } from 'mobx-react'
import { StoreContext } from '../../App'

const SelectForm = () => {
  const store = useContext(StoreContext)
  
  const changeLimit = e => {
    store.setLimit(e.target.value)
  
    if(!store.filteredPokemonsCount) {
      store.getPokemons(1)
    } else {
      store.setFilteredPokemons(1)
    }
  
    store.setPagePortion(1)
  }
  
  return useObserver(() => (
    <form className='limitForm'>
      <select value={store.limit} onChange={e => { changeLimit(e) }}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </form>
  ))
}

export default SelectForm