import { SELECT_ACCOUNT } from '../constants'

// Actions relating to trade or portfolio

export const selectAccount = data => ({
  type: SELECT_ACCOUNT,
  payload: data,
})
