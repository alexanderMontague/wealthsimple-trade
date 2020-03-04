import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGOUT_USER,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
} from '../constants'

// Auth Actions

// LOGIN
export const loginUser = data => ({
    type: LOGIN_USER,
    payload: data,
})

export const loginSuccess = data => ({
    type: LOGIN_USER_SUCCESS,
    payload: data,
})

export const loginFailure = data => ({
    type: LOGIN_USER_FAIL,
    payload: data,
})

// LOGOUT
export const logoutUser = () => ({
    type: LOGOUT_USER,
})

export const logoutSuccess = data => ({
    type: LOGOUT_USER_SUCCESS,
    payload: data,
})

export const logoutFailure = data => ({
    type: LOGOUT_USER_FAIL,
    payload: data,
})
