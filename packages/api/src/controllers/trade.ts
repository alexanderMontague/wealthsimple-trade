import { createResponse, getError } from '../helpers'
import { Tokens, Time } from '../helpers/types'

import {
  WST_getHistory,
  WST_getWatchlist,
  WST_searchSecurity,
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
 *   GET /api/v1/securities?query=<QUERY>
 *
 *   QUERY - Query searching for a certain security. Ex. MS returns Morgan Stanley, MSFT etc...
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
export async function searchSecurity(req, res, next) {
  let securityQueryData = {}
  const tokens: Tokens = req.tokens
  const query = req.params?.query

  if (!query) {
    return res
      .status(422)
      .json(createResponse(422, 'Missing security query', {}, true))
  }

  try {
    securityQueryData = await WST_searchSecurity(tokens, query)
  } catch (error) {
    return res.status(400).json(createResponse(400, getError(error), {}, true))
  }

  res.json(
    createResponse(
      200,
      `Fetched security data for query: ${query}`,
      securityQueryData,
      false
    )
  )
}

/*
 *   GET /api/v1/securities/<SECURITY_ID>/historical_quotes/<TIME>/<MIC>
 *
 *   SECURITY_ID - Security id from WS
 *   TIME - Time period to fetch data about security [1d, 1w, 1m, 3m, 1y, all]
 *   MIC - Market Identifier Code. Generally XNAS.
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
  const securityId = req.params?.security_id
  const time: Time = req.params?.time
  const mic = req.query?.mic

  if (!securityId) {
    return res
      .status(422)
      .json(createResponse(422, 'Missing security id', {}, true))
  }

  if (!time) {
    return res
      .status(422)
      .json(createResponse(422, 'Missing time period', {}, true))
  }

  try {
    securityData[time] = (
      await WST_getSecurity({
        tokens,
        securityId,
        time,
        mic,
      })
    ).results
  } catch (error) {
    return res.status(400).json(createResponse(400, getError(error), {}, true))
  }

  res.json(
    createResponse(
      200,
      `Fetched security data for security: ${securityId}`,
      securityData,
      false
    )
  )
}
