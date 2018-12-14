import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import noteReducer from './reducers/noteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
	notes: noteReducer,
	notification: notificationReducer,
	filter: filterReducer
})

const store = createStore(
	reducer,
	applyMiddleware(thunk)
)

export default store
