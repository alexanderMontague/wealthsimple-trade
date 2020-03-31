import {
  SELECT_ACCOUNT,
  GET_STATUS_RESPONSE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  GET_HISTORY,
  GET_HISTORY_RESPONSE,
  GET_WATCHLIST,
  GET_WATCHLIST_RESPONSE
} from '../constants'

const initialState = {
  selectedAccount: null,
  accounts: {},
  isHistoryLoading: false,
  historicQuotes: {},
  watchlist: {},
  isWatchlistLoading: false,
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
        historicQuotes: {},
        selectedAccount: null,
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

    case GET_HISTORY: {
      return {
        ...prevState,
        isHistoryLoading: true,
      }
    }

    case GET_HISTORY_RESPONSE: {
      return {
        ...prevState,
        isHistoryLoading: false,
        historicQuotes: {
          ...prevState.historicQuotes,
          ...payload.data,
        },
      }
    }

    case GET_WATCHLIST: {
      return {
        ...prevState,
        isWatchlistLoading: true,
      }
    }

    case GET_WATCHLIST_RESPONSE: {
      return {
        ...prevState,
        isWatchlistLoading: false,
        watchlist: {
          ...prevState.watchlist,
          ...payload.data,
        },
      }
    }

    default:
      return prevState
  }
}

export default tradeState
