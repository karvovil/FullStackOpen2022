import Blog from './Blog'
import { useSelector } from 'react-redux'

const Blogs = async ({ handleLike, handleRemove }) => {
  const blogs = await useSelector((state) => state.blogs)
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
