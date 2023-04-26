import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SearchHistoryState {
  value: Array<string>
}

const initialState: SearchHistoryState = {
  value: [],
}

export const searchHistorySlice = createSlice({
  initialState,
  name: 'searchHistory',
  reducers: {
    addSearchTerm: (state, action: PayloadAction<string>) => {
      state.value.push(action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { addSearchTerm } = searchHistorySlice.actions

export default searchHistorySlice.reducer
