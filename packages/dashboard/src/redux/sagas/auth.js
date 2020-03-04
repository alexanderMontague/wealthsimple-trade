import { put, takeLatest } from 'redux-saga/effects'
import { LOGIN_USER, LOGOUT_USER } from '../constants'
import { authActions } from '../actions'
import { loginUser } from '../../utils/requests'
import { createResponse } from '../../utils/helpers'

// LOGIN
function* attemptLoginUser({ payload }) {
    let loginResponse

    try {
        loginResponse = yield loginUser(payload)
    } catch (error) {
        loginResponse = createResponse(
            error.response?.status || 500,
            error.message || 'Something went wrong...',
            null,
            true
        )
    }

    if (loginResponse.error) {
        return yield put(authActions.loginFailure(loginResponse))
    }

    yield put(authActions.loginSuccess(loginResponse))
}

// LOGOUT
function* attemptLogoutUser() {
    const logoutResponse = yield logoutUser()

    if (logoutResponse.error) {
        return yield put(authActions.logoutFailure(logoutResponse))
    }

    yield put(authActions.logoutSuccess(logoutResponse))
}

export default function* authSaga() {
    yield takeLatest(LOGIN_USER, attemptLoginUser)
    yield takeLatest(LOGOUT_USER, attemptLogoutUser)
}
