import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  const [errorType, setErrorType] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const responseData =  await blogService.postNew(user.token, title, author, url)
    setErrorMessage(`${responseData.title} created`)
    setErrorType('notification')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000) 
    setTitle('')
    setAuthor('')
    setUrl('')


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
        <h2>New blog</h2>
        <form>
          <div>
          Title
            <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
            <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url
            <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
          <button type="submit" onClick={handleCreateBlog}>Create</button>
      </form>
    </div>
  )
}

export default App
