import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
let timerID = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {return action.payload},
        removeNotification() {return ''}
    },
  })
export const { setNotification, removeNotification } = notificationSlice.actions

export const notify = (text, time) => {
  return dispatch => {
    clearTimeout(timerID)
    dispatch(setNotification(text))
    timerID = setTimeout(()=>{dispatch(removeNotification())},time*1000)
  }
}
export default notificationSlice.reducer