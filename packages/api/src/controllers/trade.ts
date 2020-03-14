import { createResponse, getError } from '../helpers'
import { WST_getHistory  } from '../helpers/requests'

import { getPortfolioData } from '../components/portfolio'

/*
 *   GET /api/v1/history
 *
 *   ENCODED
 *   REQ: {
 *     login: {
 *       identifier: String,
 *       password: String,
 *     }
 *   }
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
  // get stringified tokens from header
  const rawTokens = req.header('tokens')

  if (!rawTokens || rawTokens === 'null') {
    return res.json(
      createResponse(200, 'Auth token missing or expired', {}, true)
    )
  }

  let historyResponse = {}
  const tokens = JSON.parse(rawTokens)
  const times = req.params?.times?.split(",")
  const account = req.query?.account_id

  if(!times || !account) {
    return res.json(
      createResponse(200, 'Missing time period or account id', {}, true)
    )
  }

  try {
  // make all requests to specified historic periods
   const fetchedHistoricalData = await Promise.all(
      times.map(time => WST_getHistory({ time, account, tokens }) )
    )

    // transform array of results to map
    fetchedHistoricalData.forEach((quote, i) => historyResponse[times[i]] = quote)
  } catch (error) {
    return res.json(createResponse(200, getError(error), {}, true))
  }

  res.json(createResponse(200, `Fetched ${times} historic quotes`, historyResponse, false))
}
