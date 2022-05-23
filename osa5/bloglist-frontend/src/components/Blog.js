import { useState } from 'react'

const Blog = ({ blog, likeHandler, removeHandler }) => {

  const blogStyle = {
    paddingTop: 0,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [showBlogInfo, setShowBlogInfo] = useState(false)

  const currentUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
  let deleteButtonStyle
  console.log(blog.user)
  if(currentUser){
    const isOwner = JSON.stringify(currentUser.username) === JSON.stringify(blog.user.username)
    deleteButtonStyle = { display: isOwner ? '' : 'none' }
  }

  const switchVisibility = () => {
    setShowBlogInfo(!showBlogInfo)
  }

  if(showBlogInfo){
    return(
      <div className="blogMore" style={blogStyle}>
        <div>{blog.title} {blog.author} <button onClick={switchVisibility}>Hide</button></div>
        <div>{blog.url}</div>
        <div>likes: {blog.likes} <button onClick={ likeHandler }>Like</button> </div>
        <div>{blog.user.name}</div>
        <button className="showButton" style={deleteButtonStyle} onClick={removeHandler}>Remove</button>
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