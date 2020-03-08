import { Response } from './types'

// Decodes and Parses encoded body information
export const decodeBody = bodyObject => {
    return JSON.parse(new Buffer(bodyObject, 'base64').toString('ascii'))
}

/*  Formats a response to be sent back
 *  response: {
 *    code: Integer,
 *    message: String,
 *    data: Object || Array || null,
 *    error: Boolean || null
 *  }
 */
export const createResponse = (
    code: Number = 500,
    message: String = 'Something went wrong',
    data: any,
    error: Boolean
): Response => ({
    code,
    message,
    data,
    error,
})

// Get an error message from requests
export const getError = error => error.response?.data?.error || error.message