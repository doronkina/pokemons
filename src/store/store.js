import { runInAction } from 'mobx'

const store = {
    isFetching: false,
    limit: 10,
    activePage: null,
    count: null,
    pokemons: [],

    //pagination
    pagePortion: 1,
    setPagePortion(portion) {
      this.pagePortion = portion
    },

    //checkboxes
    types: [],
    filteredPokemons: [],

    selectedTypes: [],
    changeSelectedTypes(type) {
      const index = this.selectedTypes.indexOf(type)
      if (index === -1) {
        this.selectedTypes.push(type)
      } else {
        this.selectedTypes.splice(index, 1)
      }
    },
    fetchedTypes: [],
    setFetchedTypes() {
      this.fetchedTypes = [...this.selectedTypes]
    },

    //pokemon
    activePokemon: null,
    setActivePokemon(pokemon) {
      this.activePokemon = pokemon
    },

    get pagesCount() {
      return this.count / this.limit
    },
    get filteredPokemonsCount() {
      return this.filteredPokemons.length
    },

    setLimit(limit) {
      this.limit = limit
    },
    clearFilters() {
      this.filteredPokemons = []
      this.selectedTypes = []
      this.fetchedTypes = []
    },

    getPokemons(page) {
      this.isFetching = true

      fetch(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${(page - 1) * this.limit}`)
        .then(res => res.json())
        .then(res => {
          Promise.all( res.results.map(res => fetch(res.url).then( res => res.json() )) )
            .then(pokemons => {
              runInAction(() => {
                this.pokemons = pokemons
                this.count = res.count
                this.activePage = page
              })
            })
            .finally(() => {
              runInAction(() => {
                this.isFetching = false
              })
            })        
        })
    },
    getTypes() {
      this.isFetching = true
      
      fetch('https://pokeapi.co/api/v2/type')
        .then(res => res.json())
        .then(res => {
          runInAction(() => {
            this.types = res.results
          })
        })
        .finally(() => {
          runInAction(() => {
            this.isFetching = false
          })
        })
    },
    searchPokemon(pokemon) {
      this.isFetching = true
      
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(res => {
          if (res.status === 200) {
            return res.json()
          }
          
          throw Error(res.status);
        })
        .then(res => {
          runInAction(() => {
            this.pokemons = [res]
            this.filteredPokemons = []
            this.selectedTypes = []
            this.fetchedTypes = []
            this.count = 1
            this.activePage = 1
            this.pagePortion = 1
          })
        })
        .catch(err => {
          if(err.message === '404') {
            alert(`Not Found ${pokemon}`)
          }
        })
        .finally(() => {
          runInAction(() => {
            this.isFetching = false
          })
        })
    },
    getFilteredPokemons(types) {
      this.isFetching = true
      
      Promise.all( types.map(type => fetch(`https://pokeapi.co/api/v2/type/${type}`).then( res => res.json() )) )
        .then(res => res.map(type => type.pokemon.map(pokemon => pokemon.pokemon)))
        .then(res => {
          const filteredPokemons = [...new Map( res.flat().map(pokemon => [pokemon.name, pokemon]) ).values()]

          runInAction(() => {
            this.filteredPokemons = filteredPokemons
          })

          return filteredPokemons.slice(0, this.limit)
        })
        .then(res => {
          Promise.all( res.map(pokemon => fetch(pokemon.url).then( res => res.json() )) )
            .then(res => {
              runInAction(() => {
                this.pokemons = res
                this.count = this.filteredPokemonsCount
                this.activePage = 1
                this.pagePortion = 1 
              })
            })
            .finally(() => {
              runInAction(() => {
                this.isFetching = false
              })
            })
        })
    },
    setFilteredPokemons(page) {
      this.isFetching = true
      
      const pokemons = this.filteredPokemons.slice((page - 1) * this.limit, page * this.limit)
      Promise.all( pokemons.map(pokemon => fetch(pokemon.url).then( res => res.json() )) )
        .then(res => {
          runInAction(() => {
            this.pokemons = res
            this.activePage = page
          })
        })
        .finally(() => {
          runInAction(() => {
            this.isFetching = false
          })
        })
    }
}

export default store