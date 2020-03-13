import { SELECT_ACCOUNT, GET_HISTORY, GET_HISTORY_RESPONSE } from '../constants'

// Actions relating to trade or portfolio

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
