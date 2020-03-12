import { put, takeLatest } from 'redux-saga/effects'
import { LOGIN_USER, LOGOUT_USER, GET_STATUS } from '../constants'
import { authActions } from '../actions'
import { loginUser, getStatus } from '../../utils/requests'
import { createResponse } from '../../utils/helpers'

// STATUS
function* getUserStatus({ payload }) {
  let statusResponse

  try {
    // pass token object as string in Auth header
    statusResponse = yield getStatus(JSON.stringify(payload))
  } catch (error) {
    // if we have an error, invalidate tokens
    delete window.localStorage.tokens

    statusResponse = createResponse(
      error.response?.status,
      error.message,
      {},
      true
    )
  }

  return yield put(authActions.statusResponse(statusResponse))
}

// LOGIN
function* attemptLoginUser({ payload }) {
  let loginResponse

  try {
    loginResponse = yield loginUser(payload)
  } catch (error) {
    loginResponse = createResponse(
      error.response?.status,
      error.message,
      {},
      true
    )
  }

  if (loginResponse.error) {
    return yield put(authActions.loginFailure(loginResponse))
  }

  // if login is successful, update tokens and dispatch success
  window.localStorage.tokens = JSON.stringify(loginResponse.data.tokens)
  yield put(authActions.loginSuccess(loginResponse))
}

// LOGOUT
function* attemptLogoutUser() {
  // const logoutResponse = yield logoutUser()

  // if (logoutResponse.error) {
  //   return yield put(authActions.logoutFailure(logoutResponse))
  // }

  // For now just wipe the auth tokens from localStorage
  // as it doesnt look like WST has dedicated a dedicated logout
  // We can simply regenerate them every login as many times as we need
  delete window.localStorage.tokens

  yield put(
    authActions.logoutSuccess(createResponse(200, 'Logged out', null, null))
  )
}

export default function* authSaga() {
  yield takeLatest(LOGIN_USER, attemptLoginUser)
  yield takeLatest(LOGOUT_USER, attemptLogoutUser)
  yield takeLatest(GET_STATUS, getUserStatus)
}
