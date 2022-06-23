import Blog from './Blog'
import { useSelector } from 'react-redux'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)

  return blogs.map((blog) => <Blog key={blog.id} blog={blog} />)
}
export default Blogs
