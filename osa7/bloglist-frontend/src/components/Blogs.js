import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'
import { appendBlog } from '../reducers/blogReducer'
import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const handleCreateBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(appendBlog(newBlog))
  }
  return (
    <div>
      <h2>blogs</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id} >
                <TableCell>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell>
                  {blog.author}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Togglable id="new-blog" buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm handleCreateBlog={handleCreateBlog} />
      </Togglable>
    </div>
  )
}
export default Blogs
