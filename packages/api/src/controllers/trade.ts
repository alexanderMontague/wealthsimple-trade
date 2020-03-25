import { createResponse, getError } from '../helpers'
import { Tokens } from '../helpers/types'

import {
  WST_getHistory,
  WST_getWatchlist,
  WST_getSecurity,
} from '../helpers/requests'

/*
 *   GET /api/v1/history/<TIME>?account_id=<ACCOUNT>
 *
 *   TIME - Time period to fetch quotes about account [1d, 1w, 1m, 3m, 1y, all]
 *   ACCOUNT - Account to fetch info from Ex. tfsa_abcxyz
 *
 *   RES: {
 *     response: {
 *       code: Integer,
 *       message: String,
 *       data: Object || Array || null,
 *       error: Boolean
 *     }
 *   }
 */
export async function getHistory(req, res, next) {
  let historyResponse = {}
  const tokens: Tokens = req.tokens
  const times = req.params?.times?.split(',')
  const account = req.query?.account_id

  if (!times || !account) {
    return res
      .status(422)
      .json(createResponse(422, 'Missing time period or account id', {}, true))
  }

  try {
    // make all requests to specified historic periods
    const fetchedHistoricalData = await Promise.all(
      times.map(time => WST_getHistory({ time, account, tokens }))
    )

    // transform array of results to map
    fetchedHistoricalData.forEach(
      (quote, i) => (historyResponse[times[i]] = quote)
    )
  } catch (error) {
    return res.status(400).json(createResponse(400, getError(error), {}, true))
  }

  res.json(
    createResponse(
      200,
      `Fetched ${times} historic quotes`,
      historyResponse,
      false
    )
  )
}

/*
 *   GET /api/v1/watchlist?limit=<LIMIT>
 *
 *   LIMIT: optional - Number of items on watchlist to return, as list could be quite long
 *
 *   RES: {
 *     response: {
 *       code: Integer,
 *       message: String,
 *       data: Object || Array || null,
 *       error: Boolean
 *     }
 *   }
 */
export async function getWatchlist(req, res, next) {
  let watchlist = {}
  const tokens: Tokens = req.tokens
  const limit = req.params?.limit

  try {
    watchlist = await WST_getWatchlist(tokens, limit)
  } catch (error) {
    return res.status(400).json(createResponse(400, getError(error), {}, true))
  }

  res.json(createResponse(200, `Fetched watchlist`, watchlist, false))
}

/*
 *   GET /api/v1/securities?query=<SYMBOL>
 *
 *   SYMBOL - Identifying Ssecurity ticker. Ex. AAPL
 *
 *   RES: {
 *     response: {
 *       code: Integer,
 *       message: String,
 *       data: Object || Array || null,
 *       error: Boolean
 *     }
 *   }
 */
export async function getSecurity(req, res, next) {
  let securityData = {}
  const tokens: Tokens = req.tokens
  const ticker = req.params?.query

  if (!ticker) {
    return res
      .status(422)
      .json(createResponse(422, 'Missing security symbol', {}, true))
  }

  try {
    securityData = await WST_getSecurity(tokens, ticker)
  } catch (error) {
    return res.status(400).json(createResponse(400, getError(error), {}, true))
  }

  res.json(
    createResponse(
      200,
      `Fetched security data for ${ticker}`,
      securityData,
      false
    )
  )
}
