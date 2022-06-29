import userService from '../services/users'
import { useState, useEffect } from 'react'
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then((result) => setUsers(result))
  }, [])
  const userList = users.map((user) => (
    <TableRow key={user.id}>
      <TableCell>
        {' '}
        <a href={`/users/${user.id}`}>{user.name}</a>
      </TableCell>
      <TableCell> {user.blogs.length} </TableCell>
    </TableRow>
  ))
  return (
    <div>
      <h2>Users</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> </TableCell>
            <TableCell> blogs created </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList}
        </TableBody>
      </Table>
    </div>
  )
}
export default Users
