import React, { useContext } from 'react'
import { StoreContext } from '../../App'
import logo from '../../img/logo.png'
import FormsContainer from '../Forms/FormsContainer'

const Header = () => {
  const store = useContext(StoreContext)
  
  const setInitialState = () => {
    store.setLimit(10)
    store.getPokemons(1)
    store.clearFilters()
  }
  
  return(
    <header className='main-header'>
      <div className='main-header__container'>
        <div className='main-header__logo'>
          <img src={logo} alt='logo' onClick={setInitialState} />
        </div>
        <FormsContainer />
      </div>
    </header>
  )
}

export default Header