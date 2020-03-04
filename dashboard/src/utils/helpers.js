/*  Formats a response to be sent back
 *  response: {
 *    code: Integer,
 *    message: String,
 *    data: Object || Array || null,
 *    error: Boolean || null
 *  }
 */
export const createResponse = (
  code = 500,
  message = "Something went wrong",
  data,
  error
) => {
  return {
    code,
    message,
    data,
    error
  };
};
