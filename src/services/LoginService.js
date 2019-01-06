import API from 'axios'
const baseUrl = '/api/login'

const login = async (credentials) => {
  const response = await API.post(baseUrl, credentials)
  return response.data
}

export default { login }