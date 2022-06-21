import Blog from './Blog'
import { useSelector } from 'react-redux'

const Blogs = ({ handleLike, handleRemove }) => {
  const blogs = useSelector((state) => state.blogs)
  return blogs.map((blog) => (
    <Blog
      key={blog.id}
      blog={blog}
      removeHandler={() => handleRemove(blog.id)}
      likeHandler={() => handleLike(blog.id)}
    />
  ))
}
export default Blogs
