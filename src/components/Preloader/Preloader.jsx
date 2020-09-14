import React, { useContext } from 'react'
import { useObserver } from 'mobx-react'
import { StoreContext } from '../../App'
import pokeball from '../../img/pokeball.png'

const Preloader = () => {
  const store = useContext(StoreContext)
  
  return useObserver(() => (
    <>
      {store.isFetching &&
        <div className='preloader'>
          <div className='preloader__img'>
            <img src={pokeball} alt='pokeball' />
          </div>
        </div>
      }
    </>
  ))
}

export default Preloader