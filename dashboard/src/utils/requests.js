import axios from "axios";

const IS_DEV = process.env.NODE_ENV === "development";
const BASE_URL = IS_DEV
  ? "http://localhost:3334/api/v1"
  : "https://TBD.ca/api/v1";

/**
 *  Request Format:
 *  POST
 *  {
 *    username: String,
 *    password: String
 *  }
 *
 *  Response Format:
 *  {
 *     code: Integer,
 *     message: String,
 *     data: Object || Array || null,
 *     error: Boolean
 *   }
 */
export const loginUser = async credentials =>
  (await axios.post(`${BASE_URL}/login`, credentials)).data;
