import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store/store'
import { addSearchTerm } from '../store/slices/searchHistorySlice'
import { PokemonList  } from '../store/api/types'

const PokemonDetailsList = ({ pokemonDetailsList }: { pokemonDetailsList: PokemonList }) => {
  const dispatch = useDispatch()
  const searchHistory = useSelector((state: RootState) => state.searchHistory.value)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filteredPokemonList, setFilteredPokemonList] = useState<PokemonList>(pokemonDetailsList)

  return (
    <>
      <div className='w-full inine-block text-center mb-4'>
        <div className='w-1/2 m-auto'>
          <form>   
            <label
              htmlFor='default-search'
              className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
            >
              Search
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <svg aria-hidden='true' className='w-5 h-5 text-gray-500 dark:text-gray-100' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
                </svg>
              </div>
              <input
                type='search'
                id='default-search'
                className='block w-full p-4 pl-10 text-sm text-gray-100 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Search these little rascals...'
                value={searchTerm}
                onChange={query => setSearchTerm(query.target.value)}
              />
              <button
                type='submit'
                className='text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                onClick={(event) => {
                  event.preventDefault()
                  searchTerm && !searchHistory.includes(searchTerm) && dispatch(addSearchTerm(searchTerm))
                  searchTerm
                    ? setFilteredPokemonList(pokemonDetailsList.filter(pokemon =>
                        pokemon.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
                      ))
                    : setFilteredPokemonList(pokemonDetailsList)
                }}
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='w-1/2 m-auto text-left'>
        {searchHistory.map((searchHistoryTerm, index) =>
          <span
            key={index}
            className='cursor-pointer mb-6 text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-blue-600 bg-blue-200 uppercase last:mr-0 mr-2'
            onClick={() => {
              setSearchTerm(searchHistoryTerm)
              setFilteredPokemonList(pokemonDetailsList.filter(pokemon =>
                pokemon.name.toLocaleLowerCase().includes(searchHistoryTerm.toLocaleLowerCase())
              ))
            }}
          >
            {searchHistoryTerm}
          </span>
        )}
      </div>
      <div className='w-full'>
        <div className='grid sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4'>
          {filteredPokemonList.map((pokemonDetail) =>
            <Link to={`/${pokemonDetail.name}/${pokemonDetail.id}`} key={pokemonDetail.name}>
              <div
                className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'
              >
                <div className='p-5'>
                  <img
                    className='rounded-t-md m-auto'
                    src={pokemonDetail.sprites?.front_shiny}
                    alt={pokemonDetail.id}
                  />
                </div>
                <div className='p-1 bg-blue-900 text-center'>
                  <p className='capitalize text-lg font-bold tracking-tight text-gray-900 dark:text-white'>
                    {pokemonDetail.name}
                  </p>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </>
  )
}

export default PokemonDetailsList
