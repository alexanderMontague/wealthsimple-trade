import { createResponse, getError } from '../helpers'
import { WST_accounts, WST_positions } from '../helpers/requests'

// gets all portfolio data about user including accounts and positions for those accounts
export async function getPortfolioData(tokens) {
  let accounts = {},
    positions = []

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
    return createResponse(200, getError(error), null, true)
  }

  // fetch position data for all accounts
  try {
    positions = (await WST_positions(tokens)).results
  } catch (error) {
    return createResponse(200, getError(error), null, true)
  }

  positions.forEach(option => {
    // we don't need every option grouping here, we can get that later if needed
    const { groups, ...optionInfo } = option

    // add every position to account positions array
    const currAccountPositions = accounts[option.account_id].positions
    accounts[option.account_id].positions = [
      ...currAccountPositions,
      optionInfo,
    ]
  })

  return {
    accounts,
    positions,
  }
}

export async function getPositions() {}
