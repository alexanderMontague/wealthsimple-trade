import { createResponse, getError } from '../helpers'
import  {WST_getHistory} from '../helpers/requests'

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

  if (rawTokens === 'null') {
    return res.json(
      createResponse(200, 'Auth token missing or expired', {}, true)
    )
  }

  let statusResponse
  const tokens = JSON.parse(rawTokens)
  const time = req.params?.time
  const account = req.query?.account_id

  console.log(tokens, time, account)

  try {
    statusResponse = await WST_getHistory({ time, account, tokens })
  } catch (error) {
    return res.json(createResponse(200, getError(error), {}, true))
  }

  // get portfolio data
  const portfolioData = await getPortfolioData(tokens)

  // merge data
  const accountInfo = {
    ...statusResponse,
    tokens,
    portfolioData,
  }

  res.json(createResponse(200, 'Authenticated', accountInfo, false))
}
