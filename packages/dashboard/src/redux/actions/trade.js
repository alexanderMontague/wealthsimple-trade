import { SELECT_ACCOUNT, GET_HISTORY, GET_HISTORY_RESPONSE, GET_WATCHLIST, GET_WATCHLIST_RESPONSE } from '../constants'

// Actions relating to trade, portfolio, and watchlist

export const selectAccount = data => ({
  type: SELECT_ACCOUNT,
  payload: data,
})

export const getHistoricalQuotes = data => ({
  type: GET_HISTORY,
  payload: data,
})

export const getHistoricalQuotesResponse = data => ({
  type: GET_HISTORY_RESPONSE,
  payload: data,
})

export const getWatchlistData = data => ({
  type: GET_WATCHLIST,
  payload: data,
})

export const getWatchlistResponse = data => ({
  type: GET_WATCHLIST_RESPONSE,
  payload: data,
})