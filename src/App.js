import React, { createContext } from 'react'
import { useLocalStore } from 'mobx-react'
import './App.scss'
import globalStore from './store/store'
import Header from './components/Header/Header'
import PokemonsBoardContainer from './components/PokemonsBoard/PokemonsBoardContainer'
import Pokemon from './components/Pokemon/Pokemon'
import Preloader from './components/Preloader/Preloader'

// store
export const StoreContext = createContext()

const StoreProvider = ({children}) => {
  const store = useLocalStore(() => (globalStore))

  return <StoreContext.Provider value={store} >{children}</StoreContext.Provider>
}

const App = () => {
  return (
    <StoreProvider>
      <Header />
      <PokemonsBoardContainer />
      <Pokemon />
      <Preloader />
    </StoreProvider>
  );
}

export default App;
