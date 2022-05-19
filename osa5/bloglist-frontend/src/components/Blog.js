//import Togglable from '../components/Togglable'
import { useState } from 'react'
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 0,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showBlogInfo, setShowBlogInfo] = useState(false)
  const switchVisibility = () => {
    setShowBlogInfo(!showBlogInfo)
  }
  if(showBlogInfo){
    return(
      <div style={blogStyle}>
        <div>{blog.title} {blog.author} <button onClick={switchVisibility}>Hide</button></div>
        <div>{blog.url}</div>
      </div>
    )
  }else{
    return(
      <div>
        {blog.title} {blog.author}
        <button onClick={switchVisibility}>Show</button>
      </div>)
  }
}
export default Blog