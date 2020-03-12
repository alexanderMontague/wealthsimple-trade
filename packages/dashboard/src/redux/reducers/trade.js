import {
  SELECT_ACCOUNT,
  LOGIN_USER_SUCCESS,
  GET_STATUS_RESPONSE,
  LOGOUT_USER_SUCCESS,
} from '../constants'

const initialState = {
  selectedAccount: null,
  accounts: {},
}

const tradeState = (prevState = initialState, { type, payload }) => {
  switch (type) {
    case SELECT_ACCOUNT: {
      return {
        ...prevState,
        selectedAccount: payload,
      }
    }

    case LOGIN_USER_SUCCESS: {
      // pull out portfolio data from login success
      const { portfolioData = {} } = payload.data

      return {
        ...prevState,
        accounts: portfolioData,
      }
    }

    case LOGOUT_USER_SUCCESS: {
      return {
        ...prevState,
        accounts: {},
      }
    }

    case GET_STATUS_RESPONSE: {
      // pull out portfolio data from login success
      const { portfolioData = {} } = payload.data

      return {
        ...prevState,
        accounts: portfolioData,
      }
    }

    default:
      return prevState
  }
}

export default tradeState
