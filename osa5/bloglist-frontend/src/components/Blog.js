import blogService from '../services/blogs'
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
  const [likes, setLikes] = useState( blog.likes)

  const switchVisibility = () => {
    setShowBlogInfo(!showBlogInfo)
  }
  const likesPlusPlus = async() => {
    const modifiedBlog = { ...blog, user: blog.user.id, likes: likes+1 }
    const updatedBlog = await blogService.update(modifiedBlog)
    setLikes(updatedBlog.likes)
  }

  if(showBlogInfo){
    return(
      <div style={blogStyle}>
        <div>{blog.title} {blog.author} <button onClick={switchVisibility}>Hide</button></div>
        <div>{blog.url}</div>
        <div>likes: {likes} <button onClick={likesPlusPlus}>Like</button> </div>
        <div>{blog.user.name}</div>
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