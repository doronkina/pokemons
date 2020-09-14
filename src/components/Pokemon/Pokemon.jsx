import React, { useContext } from 'react'
import { useObserver } from 'mobx-react'
import { StoreContext } from '../../App'
import pokeball from '../../img/pokeball.png'

const Pokemon = () => {
    const store = useContext(StoreContext)
  
    return useObserver(() =>(
        <>
        {store.activePokemon &&
            <div className='pokemon' >
                <div className='pokemon__container'>
                    <div className='pokemon__header'>
                        <h4>{store.activePokemon.name}</h4>
                        <button className='close' onClick={() => {store.setActivePokemon(null)}}></button>
                    </div>
                    <div className='pokemon__main'>
                        <div className='pokemon-card__img'>
                            <img src={store.activePokemon.sprites.front_default || pokeball} alt={store.activePokemon.name} />
                        </div>
                        <div className='pokemon__info'>
                            <InfoRow title={'weight'} value={store.activePokemon.weight} />
                            <InfoRow title={'height'} value={store.activePokemon.height} />
            
                            <InfoRow title={'forms'} value={store.activePokemon.forms.map(form => form.name)} />
                            <InfoRow title={'types'} value={store.activePokemon.types.map(type => type.type.name)} />
                            <InfoRow title={'abilities'} value={store.activePokemon.abilities.map(ability => ability.ability.name)} />
                            <InfoRow title={'held items'} value={store.activePokemon.held_items.map(item => item.item.name)} />
            
                            <InfoRow title={'base experience'} value={store.activePokemon.base_experience} />
                            <InfoRow title={'moves'} value={store.activePokemon.moves.map(move => move.move.name)} />
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    ))
}
  
const InfoRow = ({title, value}) => {
    return(
        <div className='row'>
            <p className='left'>{title}</p>
            <p className='right'>{Array.isArray(value) ? value.join(', ') : value}</p>
        </div>
    )
}

export default Pokemon