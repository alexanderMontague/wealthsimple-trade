import axios from 'axios'
import { Tokens, HistoryParam } from './types'

// Wealthsimple Trade Requests
const BASE_URL = 'https://trade-service.wealthsimple.com'
const getConfig = (tokens: Tokens) => ({
  headers: {
    common: {
      Authorization: tokens.access,
    },
  },
})

// Get Status
export const WST_status = async (tokens: Tokens) =>
  (await axios.get(`${BASE_URL}/me`, getConfig(tokens))).data

// Login
export const WST_login = credentials =>
  axios.post(`${BASE_URL}/auth/login`, credentials)

// Get Person Info
export const WST_person = async (tokens: Tokens) =>
  (await axios.get(`${BASE_URL}/person`, getConfig(tokens))).data

// Get Accounts
export const WST_accounts = async (tokens: Tokens) =>
  (await axios.get(`${BASE_URL}/account/list`, getConfig(tokens))).data

// Get Accounts
export const WST_positions = async (tokens: Tokens) =>
  (await axios.get(`${BASE_URL}/account/positions`, getConfig(tokens))).data

// Get Account Historical Data
export const WST_getHistory = async ({ time, account, tokens }: HistoryParam) =>
  (
    await axios.get(
      `${BASE_URL}/account/history/${time}?account_id=${account}`,
      getConfig(tokens)
    )
  ).data

// Get Watchlist
export const WST_getWatchlist = async (tokens: Tokens, limit: Number = null) =>
  (
    await axios.get(
      `${BASE_URL}/watchlist${limit ? `?limit=${limit}` : ''}`,
      getConfig(tokens)
    )
  ).data

// Search for securities
export const WST_searchSecurity = async (tokens: Tokens, query: String) =>
  (await axios.get(`${BASE_URL}/securities?query=${query}`, getConfig(tokens)))
    .data

// Get security Historical Data
export const WST_getSecurity = async ({ tokens, securityId, time, mic }) =>
  (
    await axios.get(
      `${BASE_URL}/securities/${securityId}${
        time ? `/historical_quotes/${time}` : ''
      }${time ? `?mic=${mic || 'XNAS'}` : ''}`,
      getConfig(tokens)
    )
  ).data

// Add security to Watchlist
export const WST_addToWatchlist = async (tokens: Tokens, security: String) =>
  (await axios.put(`${BASE_URL}/watchlist/${security}`, getConfig(tokens))).data

// Remove security from Watchlist
export const WST_removeFromWatchlist = async (
  tokens: Tokens,
  security: String
) =>
  (await axios.delete(`${BASE_URL}/watchlist/${security}`, getConfig(tokens)))
    .data
