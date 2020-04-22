import { put, takeLatest, select } from 'redux-saga/effects'
import { getHistory, getWatchlist, getSecurity } from '../../utils/requests'
import { createResponse } from '../../utils/helpers'
import { tradeActions } from '../actions'
import {
  GET_HISTORY,
  GET_WATCHLIST,
  SELECT_SECURITY,
  GET_SECURITY_HISTORY,
} from '../constants'

const getTokens = state => state.auth.user.tokens

function* getAccountHistory({ payload }) {
  let historicData
  try {
    historicData = yield getHistory(payload)
  } catch (error) {
    historicData = createResponse(
      error.response?.status,
      error.response?.data?.message || error.message,
      null,
      true
    )
  }
  return yield put(tradeActions.getHistoricalQuotesResponse(historicData))
}

function* getAccountWatchlist({ payload }) {
  let watchlistData
  try {
    watchlistData = yield getWatchlist(payload)
  } catch (error) {
    watchlistData = createResponse(
      error.response?.status,
      error.response?.data?.message || error.message,
      {},
      true
    )
  }
  return yield put(tradeActions.getWatchlistResponse(watchlistData))
}

// everytime we select a security, dispatch a fetch history for initial 1d data
function* selectSecurity({ payload }) {
  const tokens = JSON.stringify(yield select(getTokens))
  let securityData

  // fetch general data about selected security
  try {
    securityData = (yield getSecurity({ tokens, securityId: payload.id })).data
  } catch (error) {
    console.error(
      'Error fetching selected security base data.',
      error.response?.data?.message || error.message
    ) // todo better error handling
  }

  // dispatch fetched general data back to reducer
  yield put(tradeActions.selectedSecurity(securityData))

  // dispatch action to get selected security historic data
  return yield put(
    tradeActions.getSecurityHistory({ securityId: payload.id, time: '1d' })
  )
}

function* getSecurityHistory({ payload }) {
  const tokens = JSON.stringify(yield select(getTokens))

  let securityHistoryData
  try {
    securityHistoryData = yield getSecurity({ ...payload, tokens })
  } catch (error) {
    securityHistoryData = createResponse(
      error.response?.status,
      error.response?.data?.message || error.message,
      {},
      true
    )
  }
  return yield put(tradeActions.getSecurityHistoryResponse(securityHistoryData))
}

export default function* tradeSaga() {
  yield takeLatest(GET_HISTORY, getAccountHistory)
  yield takeLatest(GET_WATCHLIST, getAccountWatchlist)
  yield takeLatest(SELECT_SECURITY, selectSecurity)
  yield takeLatest(GET_SECURITY_HISTORY, getSecurityHistory)
}
