import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
  console.log('token set to '+token)
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const postNew = (newBlog) => {
  const request = axios.post(baseUrl, newBlog, { headers: { 'Authorization': `${token}` } })
  console.log('requestToken: ' +token)
  return request.then(response => response.data)
}
const update = (updatedBlog) => {
  const id  = updatedBlog.id
  const request = axios.put(`${baseUrl}/${id}`, updatedBlog, { headers: { 'Authorization': `${token}` } })
  return request.then(response => response.data)
}
const deleteBlog = (id) => {

  const request = axios.delete(`${baseUrl}/${id}`, { headers: { 'Authorization': `${token}` } })
  return request.then(response => response.data)
}

export default { getAll, postNew, update, deleteBlog, setToken }