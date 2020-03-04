import axios from "axios";

// Wealthsimple Trade Requests
const baseURL = "https://trade-service.wealthsimple.com";

// Login
export const WST_login = credentials =>
  axios.post(`${baseURL}/auth/login`, credentials);
