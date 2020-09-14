import React, { useContext } from 'react'
import { StoreContext } from '../../../App'
import pokeball from '../../../img/pokeball.png'

const PokemonCard = ({pokemon}) => {
    const store = useContext(StoreContext)
  
    return (
        <div className='pokemon-card' onClick={() => {store.setActivePokemon(pokemon)}}>
            <div className='pokemon-card__header'>
                <h4>{pokemon.name}</h4>
            </div>
            <div className='pokemon-card__img'>
                <img src={pokemon.sprites.front_default || pokeball} alt={pokemon.name} />
            </div>
            <p className='pokemon-card__footer'>{pokemon.types.map(type => <span key={type.type.name}>{type.type.name}</span>)}</p>
        </div>
    )
}

export default PokemonCard