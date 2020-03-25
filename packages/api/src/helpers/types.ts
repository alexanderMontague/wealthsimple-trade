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

export interface HistoryParam {
  time: String
  account: String
  tokens: Tokens
}
