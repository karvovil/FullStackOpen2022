import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './notificationReducer'

const store = configureStore({
    reducer: {
      anecdotes: anecdoteReducer,
      notification: notificationReducer
    }
  })
export default store