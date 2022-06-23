import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: null, messageType: null }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      const message = action.payload.message
      const messageType = action.payload.messageType
      return { message, messageType }
    },
    removeNotification(state, action) {
      return { message: null, type: null }
    },
  },
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
