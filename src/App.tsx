import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import LoadingSpinner from './components/shared/LoadingSpinner' 
import PokemonDetailsList from './components/PokemonDetailsList' 
import PokemonDetail from './components/PokemonDetail'
import { useGetAllPokemonQuery } from './store/api/pokeapi'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App: React.FC = () => {
  const dispatch = useDispatch()
  const { data: pokemonDetailsList, error, isLoading } = useGetAllPokemonQuery()
  const MainScreen: React.FC<{ children: JSX.Element }> = ({ children }) => 
    <main className='pl-8 pr-8 bg-gray-700 min-h-screen'>
      <h1 className='w-full text-center dark:text-cyan-100 font-bold pt-8 pb-8 text-6xl'>
        Pokedex
      </h1>
      {children}
    </main>

  return (
    <Router>
      <Routes>
        <Route
          key='home'
          path='/'
          element={
            <MainScreen>
              <div className='w-full'>
                {error
                  ? <p>An error occurred</p>
                  : isLoading
                    ? <div className='text-center'><LoadingSpinner /></div>
                    : pokemonDetailsList?.length
                      ? <PokemonDetailsList pokemonDetailsList={pokemonDetailsList} />
                      : <p>No results found</p>
                }
              </div>
            </MainScreen>
          }
        />
        <Route
          key="pokemon-detail"
          path='/:name/:id'
          element={<MainScreen><PokemonDetail /></MainScreen>}
        />
      </Routes>
    </Router>
  )
}

export default App
