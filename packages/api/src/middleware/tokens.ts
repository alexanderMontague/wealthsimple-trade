import { createResponse } from '../helpers'

// middleware that checks if WST tokens are included in every request
export const checkTokens = (req, res, next) => {
  // get stringified tokens from header
  const rawTokens = req.header('tokens')

  // login is the only route that does not need tokens
  if (req.path === '/api/v1/login') return next()

  // if tokens are not there, return right away
  if (!rawTokens || rawTokens === 'null' || rawTokens === 'undefined') {
    return res
      .status(403)
      .json(createResponse(403, 'Auth token missing or expired', {}, true))
  }

  // if tokens were not stringified
  if (rawTokens === '[object Object]') {
    return res
      .status(422)
      .json(
        createResponse(422, 'Did you forget to stringify tokens?', {}, true)
      )
  }

  // if tokens are there, parse and attach to the request
  req.tokens = JSON.parse(rawTokens)

  next()
}
