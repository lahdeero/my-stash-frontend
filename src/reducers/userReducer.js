import loginService from "../services/LoginService";
import noteService from '../services/NoteService'

const userReducer = (store = null, action) => {
  switch (action.type) {
    case 'LOGIN':
        return store = action.data
    case 'LOGOUT':
        store = null
        return store
    default:
      return store
  }
}

export const setLogin = (user) => {
    return async (dispatch) => {
        dispatch({
            type: 'LOGIN',
            data: user
        })
    }
}

export const loginAction = (creditentals) => {
  return async (dispatch) => {
    const user = await loginService.login(creditentals)
	await noteService.setToken(user.token)
    dispatch({
      type: 'LOGIN',
	  data: user
    })
    console.log(user.id)
    return user
  }
}

export const logoutAction = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT',
      data: null
    })
  }
}

export default userReducer
