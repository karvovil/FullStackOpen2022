import React from 'react'
import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import {
  setNotification,
  removeNotification,
} from './reducers/notificationReducer'
import { removeUser, setUser } from './reducers/userReducer'
import Users from './components/Users'
import User from './components/User'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Blog from './components/Blog'
const padding = {
  padding: 5,
}
const navigationStyle = {
  background: 'lightgrey',
  paddingBottom: 0,
  paddingLeft: 2,
  marginTop: 5,
  marginBottom: 5,
}
const App = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const notification = useSelector((state) => state.notification)
  const user = useSelector((state) => state.user)
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const currentUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(currentUser))
      blogService.setToken(currentUser.token)
    }
  }, [dispatch])
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loggedInUser = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loggedInUser)
      )
      dispatch(setUser(loggedInUser))
      blogService.setToken(loggedInUser.token)

      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(
        setNotification({
          message: 'wrong credentials',
          messageType: 'error',
        })
      )
      setTimeout(() => {
        dispatch(removeNotification)
      }, 5000)
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(removeUser())
  }

  if (user === null) {
    return (
      <div>
        <Notification
          message={notification.message}
          type={notification.messageType}
        />
        <h2>Log in to application</h2>
        <form>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit" onClick={handleLogin}>
            login
          </button>
        </form>
      </div>
    )
  }
  return (
    <Router>
      <div></div>
      <div style={navigationStyle}>
        <Link style={padding} to="/">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        {user.name} logged in
        <button id="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </div>
      <h2>blogs</h2>
      <Notification
        message={notification.message}
        type={notification.messageType}
      />

      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </Router>
  )
}

export default App
