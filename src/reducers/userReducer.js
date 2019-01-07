import loginService from "../services/LoginService";
import noteService from '../services/NoteService'

const userReducer = (store = null, action) => {
  switch (action.type) {
    case 'LOGIN':
        return store = action.data
    case 'LOGOUT':
        return store = null
    default:
      return store
  }
}

export const setLogin = (user) => {
		noteService.setToken(user.token)
    return async (dispatch) => {
        dispatch({
            type: 'LOGIN',
            data: user
        })
    }
}

export const actionForLogin = (creditentals) => {
  return async (dispatch) => {
    const user = await loginService.login(creditentals)
	  await noteService.setToken(user.token)
		await window.localStorage.setItem('loggedMystashappUser', JSON.stringify(user))
    dispatch({
      type: 'LOGIN',
	    data: user
    })
    // console.log(user)
    return user
  }
}

export const actionForLogout = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT',
      data: null
    })
  }
}

export default userReducer
