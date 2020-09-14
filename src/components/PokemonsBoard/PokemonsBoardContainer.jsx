import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../../App'
import PokemonsBoard from './PokemonsBoard'

const PokemonsBoardContainer = () => {
    const store = useContext(StoreContext)
  
    useEffect(() => {
        store.getPokemons(1)
    })
  
    return <PokemonsBoard />
}

export default PokemonsBoardContainer