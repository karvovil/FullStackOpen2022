import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const postNew = (token, title, author, url) => {
  const newBlog ={
    title: title,
    author: author,
    url: url,
  }
  const request = axios.post(baseUrl, newBlog, {headers: {'Authorization': `Bearer ${token}` }})
  return request.then(response => response.data)
}

export default { getAll, postNew }