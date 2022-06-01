import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter(state, action) {return action.payload},
        removeFilter() {return ''}
    },
  })
export const { setFilter, removeFilter } = notificationSlice.actions
export default notificationSlice.reducer