import axios from 'axios'

const IS_DEV = process.env.NODE_ENV === 'development'
const BASE_URL = IS_DEV
  ? 'http://localhost:3334/api/v1'
  : 'https://TBD.ca/api/v1'

const getHeaders = ({ tokens }) => ({
  headers: {
    common: {
      tokens,
    },
  },
})

/**
 *  Request Format:
 *  GET
 *  Send the current stored Auth tokens to see the user status
 *
 *  Response Format:
 *  {
 *     code: Integer,
 *     message: String,
 *     data: Object || Array || null,
 *     error: Boolean
 *   }
 */
export const getStatus = async tokens =>
  (await axios.get(`${BASE_URL}/status`, getHeaders({ tokens }))).data

/**
 *  Request Format:
 *  POST
 *  {
 *    username: String,
 *    password: String
 *  }
 *
 *  Response Format:
 *  {
 *     code: Integer,
 *     message: String,
 *     data: Object || Array || null,
 *     error: Boolean
 *   }
 */
export const loginUser = async credentials =>
  (await axios.post(`${BASE_URL}/login`, credentials)).data

/**
 *  Get historic quotes on account from current time period
 *
 *  Request Format:
 *  GET
 *  times: string - comma separated time values Ex. 1d,3m,1y
 *  account: string - account id
 *  tokens: string - stringified JSON access and refresh tokens
 *
 *  Response Format:
 *  {
 *     code: Integer,
 *     message: String,
 *     data: Object || Array || null,
 *     error: Boolean
 *   }
 */
export const getHistory = async ({ times, account, tokens }) =>
  (
    await axios.get(
      `${BASE_URL}/history/${times.toString()}?account_id=${account}`,
      getHeaders({ tokens })
    )
  ).data

// get watchlist
export const getWatchlist = async ({ tokens }) =>
  (await axios.get(`${BASE_URL}/watchlist`, getHeaders({ tokens }))).data

/**
 *  Search for a security based on a provided query
 *
 *  Request Format:
 *  GET
 *  tokens: string - stringified JSON access and refresh tokens
 *  query: string - some query to search for a security. Ex security id or partial string
 *
 *  Response Format:
 *  {
 *     code: Integer,
 *     message: String,
 *     data: Object || Array || null,
 *     error: Boolean
 *   }
 */
export const searchSecurity = async ({ tokens, query }) =>
  (
    await axios.get(
      `${BASE_URL}/securities?query=${query}`,
      getHeaders({ tokens })
    )
  ).data

/**
 *  Get historic quotes on a security from current time period
 *
 *  Request Format:
 *  GET
 *  tokens: string - stringified JSON access and refresh tokens
 *  time: string - time value Ex. 1d,3m,1y
 *  securityId: string - security id
 *  mic: string - market identifier code default XNAS
 *
 *  Response Format:
 *  {
 *     code: Integer,
 *     message: String,
 *     data: Object || Array || null,
 *     error: Boolean
 *   }
 */
export const getSecurity = async ({ tokens, securityId, time, mic }) =>
  (
    await axios.get(
      `${BASE_URL}/securities/${securityId}${
        time ? `/historical_quotes/${time}` : ''
      }${time ? `?mic=${mic || 'XNAS'}` : ''}`,
      getHeaders({ tokens })
    )
  ).data
