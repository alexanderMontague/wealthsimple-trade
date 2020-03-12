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
    case GET_STATUS: {
      return { ...prevState, isStatusLoading: true }
    }
    case GET_STATUS_RESPONSE: {
      // pull out portfolio data as that goes into trade state slice
      const { portfolioData, ...userInfo } = payload.data

      // if the status check was successful and tokens are valid, update auth state
      if (!payload.error) {
        return {
          ...prevState,
          user: userInfo,
          isStatusLoading: false,
          loginMessage: payload.message,
          isLoggedIn: true,
        }
      }
      // if the tokens are invalid, remove user data
      else {
        return {
          ...prevState,
          user: {},
          isStatusLoading: false,
          isLogoutError: false,
          isLoggedIn: false,
        }
      }
    }

    // LOGIN
    case LOGIN_USER: {
      return { ...prevState, isLoginLoading: true }
    }
    case LOGIN_USER_SUCCESS: {
      // pull out portfolio data as that goes into trade state slice
      const { portfolioData, ...userInfo } = payload.data

      return {
        ...prevState,
        user: userInfo,
        isLoginLoading: false,
        isLoginError: false,
        loginMessage: payload.message,
        logoutMessage: null,
        isLoggedIn: true,
      }
    }

    case LOGIN_USER_FAIL: {
      return {
        ...prevState,
        isLoginLoading: false,
        isLoginError: true,
        loginMessage: payload.message,
        isLoggedIn: false,
      }
    }

    // LOGOUT
    case LOGOUT_USER: {
      return { ...prevState, isLogoutLoading: true }
    }
    case LOGOUT_USER_SUCCESS: {
      return {
        ...prevState,
        user: null,
        isLogoutLoading: false,
        isLogoutError: false,
        logoutMessage: payload.message,
        isLoggedIn: false,
        loginMessage: null,
      }
    }

    case LOGOUT_USER_FAIL: {
      return {
        ...prevState,
        isLogoutLoading: false,
        isLogoutError: true,
        logoutMessage: payload.message,
      }
    }

    default:
      return prevState
  }
}

export default authReducer
