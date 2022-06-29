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
import { Box, Typography, Container, TextField, Button, AppBar, IconButton, Toolbar } from '@mui/material'

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
      <Container>
        <div>
          <Notification
            message={notification.message}
            type={notification.messageType}
          />
          <h2>Log in to application</h2>
          <form>
            <div>
              <TextField
                id="username"
                type="text"
                value={username}
                label="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              <TextField
                id="password"
                type="password"
                value={password}
                label="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <Button variant="contained" color="primary" id="login-button" type="submit" onClick={handleLogin}>
              login
            </Button>
          </form>
        </div>
      </Container>
    )
  }
  return (
    <Container>
      <Router>
      <Box >
<AppBar position="static">
  <Toolbar>
    <IconButton edge="start" color="inherit" aria-label="menu">
    </IconButton>
    <Button to="/" component={Link} color="inherit"  >
      blogs
    </Button>
    <Button to="/users" component={Link} color="inherit" sx={{ flexGrow: 1 }}  >
      users
    </Button>    
      <Typography sx={{ flexGrow: 3 }}>{user.name} logged in</Typography >
      <Button onClick={handleLogout} color="inherit" >
        logout
      </Button>
  </Toolbar>
</AppBar>
</Box>
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
    </Container>
  )
}

export default App
