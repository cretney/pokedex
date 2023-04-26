import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import searchHistoryReducer from './slices/searchHistorySlice'
import { pokeApi } from './api/pokeapi'

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokeApi.middleware),
  reducer: {
    searchHistory: searchHistoryReducer,
    [pokeApi.reducerPath]: pokeApi.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
