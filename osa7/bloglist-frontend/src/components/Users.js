import userService from '../services/users'
import { useState, useEffect } from 'react'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then((result) => setUsers(result))
  }, [])
  const userList = users.map((user) =>
  <tr key={user.id}>
    <td> {user.name} </td>
    <td> {user.blogs.length} </td> 
  </tr>
  )
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
        <tr>
          <th></th>
          <th> blogs created </th>
        </tr>
        {userList}
        </tbody>
      </table>
    </div>
  )
}
export default Users
