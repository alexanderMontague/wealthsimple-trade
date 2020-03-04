/*  Formats a response to be sent back
 *  response: {
 *    code: Integer,
 *    message: String,
 *    data: Object || Array || null,
 *    error: Boolean || null
 *  }
 */
export const createResponse = (code, message, data, error) => {
  return {
    code,
    message,
    data,
    error
  };
};
