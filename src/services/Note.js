import axios from 'axios'

const baseUrl = '/api/notes/directory'

// REMEMBER ALWAYS TO ADD EXPORT DEFAULT!!!!!!!!!
const getAll = async () => {
  const response = await axios.get(baseUrl + '/all')
	return response.data
}

const getOne = async (id) => {
	const response = await axios.get(baseUrl + '/note/' + id)
	return response.data
}

const create =  async (newObject) => {
  const request = await axios.post(baseUrl, newObject)
	return request.data
}

const modify = async (noteObject) => {
	const id = await noteObject.id
	const request = await axios.put(baseUrl + '/note/' + id, noteObject)
	return request
}

const erase = (id) => {
	const request = axios.delete(`${baseUrl}/note/${id}`)
	return request.then(response => response.data) 
}

export default { getAll,getOne,create,modify,erase }
