import { all } from 'redux-saga/effects'
import authSaga from './auth'
import tradeSaga from './trade'

export default function* rootSaga() {
  yield all([authSaga(), tradeSaga()])
}
