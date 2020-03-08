import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGOUT_USER,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    GET_STATUS,
    GET_STATUS_RESPONSE,
} from '../constants'

const initialState = {
    user: {},
    tokens: {},
    isLoggedIn: false,

    isStatusLoading: false,

    isLoginLoading: false,
    isLoginError: false,
    loginMessage: null,

    isLogoutLoading: false,
    isLogoutError: false,
    logoutMessage: null,
}

const authReducer = (prevState = initialState, { type, payload }) => {
    switch (type) {
        // STATUS
        case GET_STATUS:
            return { ...prevState, isStatusLoading: true }
        case GET_STATUS_RESPONSE:
            // if the status check was successful and tokens are valid, update auth state
            if (!payload.error) {
                return {
                    ...prevState,
                    user: payload.data,
                    tokens: window.location.tokens,
                    isStatusLoading: false,
                    loginMessage: payload.message,
                    isLoggedIn: true,
                }
            }
            // if the tokens are invalid, logout user
            else {
                return {
                    ...prevState,
                    user: null,
                    tokens: {},
                    isStatusLoading: false,
                    isLogoutError: false,
                    isLoggedIn: false,
                }
            }

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
                isLoggedIn: true,
            }
        case LOGIN_USER_FAIL:
            return {
                ...prevState,
                isLoginLoading: false,
                isLoginError: true,
                loginMessage: payload.message,
                isLoggedIn: false,
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
                isLoggedIn: false,
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
