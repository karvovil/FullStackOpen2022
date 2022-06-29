import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'
import { appendBlog } from '../reducers/blogReducer'
import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
const blogStyle = {
  paddingTop: 5,
  paddingBottom: 0,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginTop: 5,
  marginBottom: 5,
}
const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const handleCreateBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(appendBlog(newBlog))
  }
  return (
    <>
      {blogs.map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}

      <Togglable id="new-blog" buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm handleCreateBlog={handleCreateBlog} />
      </Togglable>
    </>
  )
}
export default Blogs
