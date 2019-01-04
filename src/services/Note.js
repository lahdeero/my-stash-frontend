import API from 'axios'

const baseUrl = '/api/notes/directory'

// REMEMBER ALWAYS TO ADD EXPORT DEFAULT!!!!!!!!!
const getAll = async () => {
  const response = await API.get(baseUrl + '/all')
	return response.data
}

const getOne = async (id) => {
	const response = await API.get(baseUrl + '/note/' + id)
	return response.data
}

const create =  async (newObject) => {
  const request = await API.post(baseUrl, newObject)
	return request.data
}

const modify = async (noteObject) => {
	const id = await noteObject.id
	const request = await API.put(baseUrl + '/note/' + id, noteObject)
	return request
}

const erase = async (id) => {
	const response = await API.delete(`${baseUrl}/note/${id}`)
	console.log('response ' + response.data)
	return response.data
}

export default { getAll,getOne,create,modify,erase }
