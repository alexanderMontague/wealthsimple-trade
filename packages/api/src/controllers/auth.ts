import { createResponse, getError } from '../helpers'
import { Tokens } from '../helpers/types'

import { WST_login, WST_status } from '../helpers/requests'

import { getPortfolioData } from '../components/portfolio'

/*
 *   GET /api/v1/status
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
export async function getStatus(req, res, next) {
  let statusResponse
  const tokens: Tokens = req.tokens

  try {
    statusResponse = await WST_status(tokens)
  } catch (error) {
    return res.status(400).json(createResponse(400, getError(error), {}, true))
  }

  // get portfolio data
  const portfolioDataRes = <any>await getPortfolioData(tokens)

  // if there was an error, return the created response
  if (portfolioDataRes?.error) {
    return res.status(400).json(portfolioDataRes)
  }

  // merge data
  const accountInfo = {
    ...statusResponse,
    tokens,
    portfolioData: portfolioDataRes,
  }

  res.json(createResponse(200, 'Authenticated', accountInfo, false))
}

/*
 *   POST /api/v1/login
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
export async function login(req, res, next) {
  const credentials = { ...req.body }

  if (!credentials.email) {
    return res
      .status(422)
      .json(createResponse(422, 'An email needs to be present', null, true))
  }

  if (!credentials.password) {
    return res
      .status(422)
      .json(createResponse(422, 'A password needs to be present', null, true))
  }

  let loginResponse
  try {
    loginResponse = await WST_login(credentials)
  } catch (error) {
    return res
      .status(400)
      .json(createResponse(400, getError(error), null, true))
  }

  // pull tokens out of headers to send back for future requests
  const tokens = {
    access: loginResponse.headers['x-access-token'],
    refresh: loginResponse.headers['x-refresh-token'],
  }

  // also get base portfolio data on login
  const portfolioData = await getPortfolioData(tokens)

  res.json(
    createResponse(
      200,
      'Successfully logged in!',
      { ...loginResponse.data, tokens, portfolioData },
      false
    )
  )
}
