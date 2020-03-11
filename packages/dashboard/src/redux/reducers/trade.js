import { SELECT_ACCOUNT } from '../constants'

const initialState = {
  account: null,
}

const tradeState = (prevState = initialState, { type, payload }) => {
  switch (type) {
    case SELECT_ACCOUNT:
      return {
        ...prevState,
        account: payload,
      }

    default:
      return prevState
  }
}

export default tradeState
