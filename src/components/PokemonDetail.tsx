import React, { useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { useGetEvolutionQuery } from '../store/api/pokeapi'
import LoadingSpinner from '../components/shared/LoadingSpinner' 

const PokemonDetail = () => {
  const navigate = useNavigate();
  const { id: pokemonId, name } = useParams()
  const { data: pokemonEvolution, error, isLoading } = useGetEvolutionQuery(Number(pokemonId))
  const evolvesTo = pokemonEvolution?.chain?.evolves_to[0]
  const evolvesToUrl = evolvesTo?.species?.url.split('/') || []
  const evolvesToId = evolvesToUrl[evolvesToUrl.length - 2]

  return (
    <>
      {error
        ? <p>An error occurred</p>
        : isLoading
          ? <div className='text-center'><LoadingSpinner /></div>
          : <div className='w-full inine-block text-center text-white mb-4 mt-6'>
              <h2 className='capitalize mb-6 text-4xl'>{name}</h2>
              {evolvesTo &&
                <div className='text-xl'>
                  <h4>
                    <span className='capitalize mr-1'>{name}</span> 
                    evolves into <span className='capitalize mr-1'>{evolvesTo.species.name}</span>
                    <span className='font-bold'>
                      at level {evolvesTo.evolution_details[0].min_level}
                    </span>
                  </h4>
                  <div className='w-1/4 inline-block'>
                    <div className='flex mt-6'>
                      <img
                        className='rounded-t-md m-auto'
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemonId}.png`}
                        alt={name}
                      />
                      <span className='mt-6'>&#8594;</span>
                      <img
                        className='rounded-t-md m-auto'
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${evolvesToId}.png`}
                        alt={evolvesTo.species.name}
                      />
                    </div>
                  </div>
                </div>
              }
              <button
                className='text-white mt-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                onClick={(event) => {
                  event.preventDefault()
                  navigate(-1)
                }}
              >
                Back
              </button>
            </div>
      }
    </>
  )
}

export default PokemonDetail
