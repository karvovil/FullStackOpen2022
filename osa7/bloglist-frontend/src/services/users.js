import axios from 'axios'

const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const getOne = async (id) => {
  const response = await axios.get(baseUrl)
  const singleUser = response.data.find(user => user.id===id)
  return singleUser
}

export default { getAll, getOne }
