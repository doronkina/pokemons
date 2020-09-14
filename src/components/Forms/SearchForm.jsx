import React, { useContext, useState } from 'react'
import { StoreContext } from '../../App'

const SearchForm = () => {
  const store = useContext(StoreContext)
  const [pokemon, setPokemon] = useState('')
  
  const searchPokemon = e => {
    if(pokemon.length) {
      store.searchPokemon(pokemon)
    }
  
    e.preventDefault()
  }
  
  return (
    <form className='searchForm' onSubmit={searchPokemon}>
      <input type='search' value={pokemon} onChange={ e => { setPokemon(e.target.value) } } />
      <button type='submit'>Search</button>
    </form>
  )
}

export default SearchForm