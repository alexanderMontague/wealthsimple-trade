import { combineReducers } from 'redux'
import auth from './auth'
import userInterface from './interface'
import trade from './trade'

const rootReducer = combineReducers({
  auth,
  userInterface,
  trade,
})

export default rootReducer
