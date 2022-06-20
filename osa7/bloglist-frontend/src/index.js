import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
