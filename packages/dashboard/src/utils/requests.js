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
// (await axios.get(`${BASE_URL}/status`)).data

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
 *  Request Format:
 *  GET
 *
 *  Response Format:
 *  {
 *     code: Integer,
 *     message: String,
 *     data: Object || Array || null,
 *     error: Boolean
 *   }
 */
// export const getAccounts = async tokens =>
//     (await axios.post(`${BASE_URL}/login`, credentials)).data
