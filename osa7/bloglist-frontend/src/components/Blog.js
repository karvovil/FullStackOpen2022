import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Comments from './Comments'
const Blog = () => {
  const id = useParams().id
  
  const blogStyle = {
    paddingTop: 0,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const dispatch = useDispatch()
  const blog = useSelector((state) => state.blogs).find(
    (blog) => blog.id === id
  )
  const currentUser = JSON.parse(
    window.localStorage.getItem('loggedBlogappUser')
  )
  let deleteButtonStyle
  if (currentUser && blog) {
    const isOwner =
      JSON.stringify(currentUser.username) ===
      JSON.stringify(blog.user.username)
    deleteButtonStyle = { display: isOwner ? '' : 'none' }
  }
  console.log(blog)
  if (blog) {
    return (
      <div className="blogMore" style={blogStyle}>
        <h1>
          {blog.title} {blog.author}{' '}
        </h1>
        <a href={blog.url}>{blog.url}</a>
        <div>
          likes: {blog.likes}
          <button onClick={() => dispatch(likeBlog(blog.id))}>Like</button>{' '}
        </div>
        <div>Added by: {blog.user.name}</div>
        <button
          className="showButton"
          style={deleteButtonStyle}
          onClick={() => dispatch(deleteBlog(blog.id))}
        >
          Remove
        </button>
        <Comments blog={blog} />
      </div>
    )
  }
}
export default Blog
