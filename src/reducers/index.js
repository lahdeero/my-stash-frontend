import { combineReducers } from 'redux'
import notes from './note'
import filter from './filter'
import notification from './notification'

export default combineReducers({
    notes,
    filter,
    notification
})