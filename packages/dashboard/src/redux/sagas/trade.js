import { put, takeLatest, select } from 'redux-saga/effects'
import { getHistory } from '../../utils/requests'
import { createResponse } from '../../utils/helpers'
import { tradeActions } from '../actions'
import { GET_HISTORY, GET } from '../constants'

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

  return yield put(
    tradeActions.getHistoricalQuotesResponse(
      createResponse(
        200,
        `Fetched ${payload.time} historic data`,
        historicData,
        false
      )
    )
  )
}

export default function* tradeSaga() {
  yield takeLatest(GET_HISTORY, getAccountHistory)
}
