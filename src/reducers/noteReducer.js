import noteService from '../services/Notes.js'

const noteReducer = (store = [], action) => {
	switch(action.type) {
		case 'CREATE':
			return store.concat(action.data)
		case 'MODIFY':
			return store.map(note => (note.id === action.data[0].id) ? action.data[0] : note)
		case 'REMOVE':
			return [...store.filter(note => note.id !== action.data), action.data]
		case 'INIT_NOTES':
			return action.data
		default:
			return store
	}
}

export const noteInitialization = () => {
	return async (dispatch) => {
		const notes = await noteService.getAll()
		dispatch({
			type: 'INIT_NOTES',
			data: notes
		})
	}
}

export const createNote = (noteObject) => {
	return async (dispatch) => {
		const saved_noteObject = await noteService.create(noteObject)
		console.log(saved_noteObject)
		dispatch({
			type: 'CREATE',
			data: saved_noteObject
		})
	}
}

export const modifyNote = (noteObject) => {
	return async (dispatch) => {
		await noteService.modify(noteObject)
		const modified_noteObject = await noteService.getOne(noteObject.id)
		await dispatch({
			type: 'MODIFY',
			data: modified_noteObject
		})
	}
}

export const removeNote = (id) => {
	return async (dispatch) => {
		await noteService.erase(id)
		dispatch({
			type: 'REMOVE',
			data: id
		})
	}
}

export default noteReducer
