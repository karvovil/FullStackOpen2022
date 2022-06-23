import userService from '../services/users'
import { useState, useEffect } from 'react'
import {useParams} from "react-router-dom"

const User = () => {
  const [user, setUser] = useState(null)
  const id = useParams().id
  console.log(id)

  useEffect(() => {
    console.log('ineffect'  )
    userService.getOne(id).then(
      (result) =>{
        console.log('resultname: '+result.name)
        setUser(result)
      }
    )
  }, [])

  console.log(user)
  
  if(!user){
    return null 
  }else{
    const listOfBlogs = user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>) 

    return(<div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>{listOfBlogs}</ul>

      </div>) 
  }
}
export default User