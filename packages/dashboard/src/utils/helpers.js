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
  message = 'Something went wrong',
  data,
  error
) => {
  return {
    code,
    message,
    data,
    error,
  }
}

// given a WST account id, return the formatted values
export const getFormattedAccount = account => {
  if (account.includes('tfsa')) {
    return { value: account, display: 'TFSA' }
  } else if (account.includes('rrsp')) {
    return { value: account, display: 'RRSP' }
  } else if (account.includes('non-registered')) {
    return { value: account, display: 'Personal' }
  }

  return {
    value: 'unknown',
    display: 'Unknown Account',
  }
}
