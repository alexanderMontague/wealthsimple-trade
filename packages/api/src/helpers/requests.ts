import axios from 'axios'

const request = axios.create()

// Wealthsimple Trade Requests
const baseURL = 'https://trade-service.wealthsimple.com'
const getConfig = authToken => ({
    headers: {
        common: {
            Authorization: authToken,
        },
    },
})

// Get Status
export const WST_status = async tokens =>
    (await axios.get(`${baseURL}/me`, getConfig(tokens.access))).data

// Login
export const WST_login = credentials =>
    axios.post(`${baseURL}/auth/login`, credentials)

// Get Accounts
export const WST_accounts = () => axios.get(`${baseURL}/account/list`)

// Get Accounts
export const WST_positions = () => axios.get(`${baseURL}/account/positions`)
