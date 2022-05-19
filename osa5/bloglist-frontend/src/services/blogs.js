import axios from 'axios'

const baseUrl = '/api/blogs'
const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
const currentUser = JSON.parse(loggedUserJSON)
const token = currentUser.token

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const postNew = (token2, newBlog) => {
  const request = axios.post(baseUrl, newBlog, { headers: { 'Authorization': `Bearer ${token}` } })
  return request.then(response => response.data)
}
const update = (updatedBlog) => {
  const id  = updatedBlog.id

  const request = axios.put(`${baseUrl}/${id}`, updatedBlog, { headers: { 'Authorization': `bearer ${token}` } })
  console.log(request)
  return request.then(response => response.data)
}

export default { getAll, postNew, update }