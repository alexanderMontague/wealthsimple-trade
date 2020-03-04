import { combineReducers } from 'redux'
import auth from './auth'
import userInterface from './interface'

const rootReducer = combineReducers({
    auth,
    userInterface,
})

export default rootReducer
