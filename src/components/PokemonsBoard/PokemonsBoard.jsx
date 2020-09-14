import React, { useContext } from 'react'
import { useObserver } from 'mobx-react'
import { StoreContext } from '../../App'
import PokemonCard from './PokemonCard/PokemonCard'

const PokemonsBoard = () => {
  const store = useContext(StoreContext)
  
  const pagination = portion => {
    const openPage = page => {
      if (!store.filteredPokemonsCount) {
        store.getPokemons(page)
      } else {
        store.setFilteredPokemons(page)
      }
    }
  
    const btns = []
    if(store.pagesCount) {
      const first = (portion - 1) * 7
      let last = (portion * 7) < store.pagesCount ? (portion * 7) : store.pagesCount
  
      for(let i = first; i < last; i++) {
        btns.push(<button key={i} onClick={() => { openPage(i + 1) }} disabled={(i + 1) === store.activePage}>{i + 1}</button>)
      }
    }
  
    return(btns)
  }
  
  return useObserver(() => (
    <div className='pokemons'>
      <div className='pokemons__container'>
        {store.pokemons.map(pokemon => <PokemonCard key={pokemon.name} pokemon={pokemon} />)}
      </div>
      <div className='pagination'>
        <div className='pagination__container'>
          <button onClick={() => {store.setPagePortion(store.pagePortion - 1)}} disabled={store.pagePortion === 1}>...</button>
          <div className='pagination__pages'>
            { pagination(store.pagePortion) }
          </div>
          <button onClick={() => {store.setPagePortion(store.pagePortion + 1)}} disabled={store.pagePortion === Math.ceil(store.pagesCount / 7)}>...</button>
        </div>
      </div>
    </div>
  ))
}

export default PokemonsBoard