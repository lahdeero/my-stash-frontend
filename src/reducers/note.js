import noteService from '../services/Note.js'

const noteReducer = (store = [], action) => {
	switch(action.type) {
		case 'CREATE':
			return [
				...store,
				{
					id: action.data.id,
					title: action.data.otsikko,
					sisalto: action.data.sisalto,
					tagit: action.data.tagit 
				}
			]
		case 'MODIFY':
			return store.map(note => (note.id === action.data[0].id) ? action.data[0] : note)
		case 'REMOVE':
			return [...store.filter(note => note.id !== action.data), action.data]
		case 'INIT_NOTES':
			return action.data
			// return store.concat(action.data)
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
		// console.log(saved_noteObject[0])
		dispatch({
			type: 'CREATE',
			// data: {
			// 	id: saved_noteObject.id,
			// 	title: saved_noteObject.otsikko,
			// 	content: saved_noteObject.sisalto,
			// 	tags: saved_noteObject.tagit
			// }
			data: saved_noteObject[0]
		})
		return saved_noteObject[0].id
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
