import { put, takeLatest, select } from 'redux-saga/effects'
import { getHistory, getWatchlist } from '../../utils/requests'
import { createResponse } from '../../utils/helpers'
import { tradeActions } from '../actions'
import { GET_HISTORY, GET_WATCHLIST } from '../constants'

function* getAccountHistory({ payload }) {
  let historicData
  try {
    historicData = yield getHistory(payload)
  } catch (error) {
    historicData = createResponse(
      error.response?.status,
      error.message,
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
      error.message,
      null,
      true
    )
  }
  return yield put(tradeActions.getWatchlistResponse(watchlistData))
}

export default function* tradeSaga() {
  yield takeLatest(GET_HISTORY, getAccountHistory)
  yield takeLatest(GET_WATCHLIST, getAccountWatchlist)
}
