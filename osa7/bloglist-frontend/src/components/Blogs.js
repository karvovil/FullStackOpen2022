import Blog from './Blog'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'
import { appendBlog } from '../reducers/blogReducer'
import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const handleCreateBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(appendBlog(newBlog))
  }
  const blogList = blogs.map(blog => <Blog key={blog.id} blog={blog} />)
  return (<>
    {blogList}
    <Togglable id="new-blog" buttonLabel="New Blog" ref={blogFormRef}>
      <BlogForm handleCreateBlog={handleCreateBlog} />
    </Togglable>
    </>)
}
export default Blogs
