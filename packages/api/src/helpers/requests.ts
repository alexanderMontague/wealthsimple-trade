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
  (await axios.get(
    `${BASE_URL}/account/history/${time}?account_id=${account}`,
    getConfig(tokens)
  )).data

// Get Watchlist
export const WST_getWatchlist = async (tokens: Tokens, limit: Number = null) =>
  (await axios.get(
    `${BASE_URL}/watchlist${limit ? `?limit=${limit}` : ''}`,
    getConfig(tokens)
  )).data

// Get Specific Security Info
export const WST_getSecurity = async (tokens: Tokens, symbol: String) =>
  (await axios.get(`${BASE_URL}/securities?query=${symbol}`, getConfig(tokens)))
    .data
