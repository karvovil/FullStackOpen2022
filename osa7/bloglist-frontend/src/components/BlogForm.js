import { useState } from 'react'
import PropTypes from 'prop-types'

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
          Title
          <input
            id="new-title"
            title="titleInput"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            id="new-author"
            title="authorInput"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url
          <input
            id="new-url"
            title="urlInput"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit" onClick={addBlog}>
          Create
        </button>
      </form>
    </>
  )
}
BlogForm.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired,
}
export default BlogForm
