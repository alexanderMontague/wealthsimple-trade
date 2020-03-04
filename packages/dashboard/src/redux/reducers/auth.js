import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGOUT_USER,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
} from '../constants'

const initialState = {
    user: {},
    tokens: {},

    isLoginLoading: false,
    isLoginError: false,
    loginMessage: null,

    isLogoutLoading: false,
    isLogoutError: false,
    logoutMessage: null,
}

const authReducer = (prevState = initialState, { type, payload }) => {
    switch (type) {
        // LOGIN
        case LOGIN_USER:
            return { ...prevState, isLoginLoading: true }
        case LOGIN_USER_SUCCESS:
            return {
                ...prevState,
                user: payload.data,
                tokens: payload.data?.tokens,
                isLoginLoading: false,
                isLoginError: false,
                loginMessage: payload.message,
            }
        case LOGIN_USER_FAIL:
            return {
                ...prevState,
                isLoginLoading: false,
                isLoginError: true,
                loginMessage: payload.message,
            }

        // LOGOUT
        case LOGOUT_USER:
            return { ...prevState, isLogoutLoading: true }
        case LOGOUT_USER_SUCCESS:
            return {
                ...prevState,
                user: null,
                isLogoutLoading: false,
                isLogoutError: false,
                logoutMessage: payload.message,
            }
        case LOGOUT_USER_FAIL:
            return {
                ...prevState,
                isLogoutLoading: false,
                isLogoutError: true,
                logoutMessage: payload.message,
            }

        default:
            return prevState
    }
}

export default authReducer
