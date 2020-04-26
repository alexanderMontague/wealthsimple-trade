export interface Response {
  code: Number
  message: String
  data: Array<any> | Object | null
  error: Boolean
}

export interface Tokens {
  access: String
  refresh: String
}

export type Time = '1d' | '1w' | '1m' | '3m' | '1y' | '5y' | 'All'

export interface HistoryParam {
  time: Time
  account: String
  tokens: Tokens
}

export interface SecurityOrder {
  account_id: String
  quantity: Number
  security_id: String
  order_type: 'buy_quantity' | 'sell_quantity'
  order_sub_type: 'market'
  time_in_force: 'day'
  limit_price?: Number
}
