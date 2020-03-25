import { createResponse, getError } from '../helpers'
import { WST_accounts, WST_positions } from '../helpers/requests'

// gets all portfolio data about user including accounts and positions for those accounts
export async function getPortfolioData(tokens) {
  let accounts = {}
  let positions = []

  // fetch account info
  try {
    const accountInfo = (await WST_accounts(tokens)).results

    // transition account results into key-map pair for easy lookup
    accountInfo.forEach(account => {
      const { id, ...accountInfo } = account
      accounts[id] = accountInfo
      accounts[id].positions = []
    })
  } catch (error) {
    return createResponse(400, getError(error), null, true)
  }

  // fetch position data for all accounts
  try {
    positions = (await WST_positions(tokens)).results
  } catch (error) {
    return createResponse(400, getError(error), null, true)
  }

  positions.forEach(option => {
    // we don't need all sparkline quotes here
    const { sparkline, ...optionInfo } = option

    // add each option to the account it belongs to
    accounts[optionInfo.account_id].positions.push(optionInfo)
  })

  return accounts
}

export async function getPositions() {}
