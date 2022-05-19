import { useState, useEffect, useRef  } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])


  const [errorMessage, setErrorMessage] = useState(null)
  const [errorType, setErrorType] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((a,b) => b.likes-a.likes)
      setBlogs( sortedBlogs )
    })
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const currentUser = JSON.parse(loggedUserJSON)
      setUser(currentUser)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setErrorType('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleLogout = () => {window.localStorage.removeItem('loggedBlogappUser')}

  const handleCreateBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    const createdBlog = await blogService.postNew(newBlog)

    setErrorMessage(`${createdBlog.title} created`)
    setErrorType('notification')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    setBlogs(blogs.concat(createdBlog))
  }

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} type={errorType}  />
        <h2>Log in to application</h2>
        <form>
          <div>
          username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit" onClick={handleLogin}>login</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>Log Out</button>
      </p>
      <h2>blogs</h2>
      <Notification message={errorMessage} type={errorType}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm
          handleCreateBlog={handleCreateBlog}
          token={user.token}
        />
      </Togglable>

    </div>
  )
}

export default App
