import blogService from '../services/blogs'
import { useState } from 'react'

const Blog = ({ blogToShow, handler }) => {

  const showBlogStyle = {
    paddingTop: 0,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const[blog, setBlog] = useState(blogToShow)
  const [blogStyle, setBlogStyle] = useState(showBlogStyle)
  const [showBlogInfo, setShowBlogInfo] = useState(false)

  const currentUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
  let deleteButtonStyle
  if(currentUser){
    const isOwner = JSON.stringify(currentUser.username) === JSON.stringify(blog.user.username)
    deleteButtonStyle = { display: isOwner ? '' : 'none' }
  }

  const switchVisibility = () => {
    setShowBlogInfo(!showBlogInfo)
  }
  const likesPlusPlus = async() => {
    const modifiedBlog = { ...blog, user: blog.user.id, likes: blog.likes+1 }
    const updatedBlog = await blogService.update(modifiedBlog)
    setBlog(updatedBlog)
  }
  const handleDelete = async() => {
    if(window.confirm('Sure?')){
      await blogService.deleteBlog(blog.id)
      setBlogStyle({ display: 'none' })
    }
  }

  if(showBlogInfo){
    return(
      <div className="blogMore" style={blogStyle}>
        <div>{blog.title} {blog.author} <button onClick={switchVisibility}>Hide</button></div>
        <div>{blog.url}</div>
        <div>likes: {blog.likes} <button onClick={likesPlusPlus}>Like</button> </div>
        <div>{blog.user.name}</div>
        <button className="showButton" style={deleteButtonStyle} onClick={handleDelete}>Remove</button>
      </div>
    )
  }else{
    return(
      <div className="blogLess">
        {blog.title} {blog.author}
        <button onClick={switchVisibility}>Show</button>
      </div>)
  }
}

export default Blog