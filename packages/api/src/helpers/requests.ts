import axios from 'axios'

// Wealthsimple Trade Requests
const BASE_URL = 'https://trade-service.wealthsimple.com'
const getConfig = tokens => ({
  headers: {
    common: {
      Authorization: tokens.access,
    },
  },
})

// Get Status
export const WST_status = async tokens =>
  (await axios.get(`${BASE_URL}/me`, getConfig(tokens))).data

// Login
export const WST_login = credentials =>
  axios.post(`${BASE_URL}/auth/login`, credentials)

// Get Person Info
export const WST_person = async tokens =>
  (await axios.get(`${BASE_URL}/person`, getConfig(tokens))).data

// Get Accounts
export const WST_accounts = async tokens =>
  (await axios.get(`${BASE_URL}/account/list`, getConfig(tokens))).data

// Get Accounts
export const WST_positions = async tokens =>
  (await axios.get(`${BASE_URL}/account/positions`, getConfig(tokens))).data

export const WST_getHistory = async ({ time, account, tokens }) =>
  (await axios.post(
    `${BASE_URL}/history/${time}?account_id=${account}`,
    getConfig(tokens)
  )).data
