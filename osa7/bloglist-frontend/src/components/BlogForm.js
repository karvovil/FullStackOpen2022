import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  TextField, Button
} from '@mui/material'
const BlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url,
      likes: 0,
      comments: [],
    }
    handleCreateBlog(blog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <>
      <h2>New blog</h2>
      <form>
        <div>
          <TextField
            type="text"
            value={title}
            label="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            type="text"
            value={author}
            label="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            type="text"
            value={url}
            label="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button variant="contained" color="primary" type="submit" onClick={addBlog}>
          Create
        </Button>
      </form>
    </>
  )
}
BlogForm.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired,
}
export default BlogForm
