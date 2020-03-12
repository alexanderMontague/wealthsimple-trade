import axios from 'axios'

// Wealthsimple Trade Requests
const baseURL = 'https://trade-service.wealthsimple.com'
const getConfig = tokens => ({
  headers: {
    common: {
      Authorization: tokens.access,
    },
  },
})

// Get Status
export const WST_status = async tokens =>
  (await axios.get(`${baseURL}/me`, getConfig(tokens))).data

// Login
export const WST_login = credentials =>
  axios.post(`${baseURL}/auth/login`, credentials)

// Get Person Info
export const WST_person = async tokens =>
  (await axios.get(`${baseURL}/person`, getConfig(tokens))).data

// Get Accounts
export const WST_accounts = async tokens =>
  (await axios.get(`${baseURL}/account/list`, getConfig(tokens))).data

// Get Accounts
export const WST_positions = async tokens =>
  (await axios.get(`${baseURL}/account/positions`, getConfig(tokens))).data
