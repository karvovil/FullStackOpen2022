import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 0,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [showBlogInfo, setShowBlogInfo] = useState(false)
  const dispatch = useDispatch()

  const currentUser = JSON.parse(
    window.localStorage.getItem('loggedBlogappUser')
  )
  let deleteButtonStyle
  if (currentUser) {
    const isOwner = JSON.stringify(currentUser.username) === JSON.stringify(blog.user.username)
    deleteButtonStyle = { display: isOwner ? '' : 'none' }
  }

  const switchVisibility = () => {
    setShowBlogInfo(!showBlogInfo)
  }

  if (showBlogInfo) {
    return (
      <div className="blogMore" style={blogStyle}>
        <div>
          {blog.title} {blog.author}{' '}
          <button onClick={switchVisibility}>Hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          likes: {blog.likes} 
          <button onClick={ () => dispatch(likeBlog(blog.id)) }>Like</button>{' '}
        </div>
        <div>{blog.user.name}</div>
        <button
          className="showButton"
          style={deleteButtonStyle}
          onClick={ () => dispatch(deleteBlog(blog.id)) }
        >
          Remove
        </button>
      </div>
    )
  } else {
    return (
      <div className="blogLess">
        {blog.title} {blog.author}
        <button onClick={switchVisibility}>Show</button>
      </div>
    )
  }
}

export default Blog
