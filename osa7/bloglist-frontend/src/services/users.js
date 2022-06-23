import axios from 'axios'

const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const getOne = async (id) => {
  console.log(id)
  const response = await axios.get(baseUrl)
  console.log(response)
  const singleUser = response.data.find(user => user.id===id)
  console.log(singleUser)
  return singleUser
}

export default { getAll, getOne }
