//import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const currentUser = JSON.parse(loggedUserJSON)
      setUser(currentUser)
      blogService.setToken(currentUser.token)
    }
  }, [])
  useEffect(() => {
     blogService.getAll().then(blogsFromDB =>
      dispatch({
        type: 'SET_BLOGS',
        data: blogsFromDB
      })
    )
  }, [])

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
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)

      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch({
        type: 'NEW_NOTIFICATION',
        data: {
          message: 'wrong credentials',
          messageType: 'error',
        },
      })
      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION' })
      }, 5000)
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleCreateBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    const createdBlog = await blogService.postNew(newBlog)
    dispatch({
      type: 'NEW_BLOG',
      data: createdBlog,
    })
    dispatch({
      type: 'NEW_NOTIFICATION',
      data: {
        message: `${newBlog.title} created`, //TODO get actual blog from db
        messageType: 'notification',
      },
    })
    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION' })
    }, 5000)
  }
  const handleLike = async (id) => {
    const blogToModify = blogs.find((blog) => blog.id === id)
    const modifiedBlog = {
      ...blogToModify,
      user: blogToModify.user.id,
      likes: blogToModify.likes + 1,
    }
    const updatedBlog = await blogService.update(modifiedBlog)

    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog,
    })
  }
  const handleRemove = async (id) => {
    if (window.confirm('Sure?')) {
      await blogService.deleteBlog(id)
      dispatch({
        type: 'REMOVE_BLOG',
        id: id,
      })
    }
  }
  if (user === null) {
    return (
      <div>
        <Notification message={notification.message} type={notification.messageType} />
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
    <div>
      <p>
        {user.name} logged in
        <button id="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </p>
      <h2>blogs</h2>
      <Notification message={notification.message} type={notification.messageType} />
      <Blogs
        handleRemove={handleRemove}
        handleLike={handleLike}
      />
      <Togglable id="new-blog" buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm handleCreateBlog={handleCreateBlog} />
      </Togglable>
    </div>
  )
}

export default App
