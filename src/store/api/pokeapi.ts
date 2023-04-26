import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PokemonList  } from './types'
import ky from 'ky'

// Define a service using a base URL and expected endpoints
export const pokeApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2',
    fetchFn: (...args) => ky(...args),
  }),
  endpoints: (builder) => ({
    getAllPokemon: builder.query<PokemonList, number>({
      queryFn: async (limit = 151, queryApi, extraOptions, fetchWithKy) => {
        const { data: { results: pokemonList }, error }
          = await fetchWithKy({ url: `/pokemon`, params: { limit, offset: 0 }, })
        if (error) return { error: error }
        const pokemonDetailsPromises = pokemonList.map(({ url }) => fetchWithKy({ url, }))
        return Promise.all(pokemonDetailsPromises).then((pokemonDetailsResults) => {
          const pokemonDetailsList = pokemonDetailsResults.map(pokemonDetail =>
            ({ ...pokemonDetail.data })
          )
          return { data: pokemonDetailsList }

        }).catch(error => ({ error: error }))
      },
    }),
    getEvolution: builder.query<any, number>({
      query: (id) => `evolution-chain/${id}`,
    }),
  }),
  reducerPath: 'pokeApi',
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllPokemonQuery, useGetEvolutionQuery } = pokeApi
