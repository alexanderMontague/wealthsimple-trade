import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { tradeActions } from '../redux/actions'

import { getFormattedAccount } from '../utils/helpers'

import {
  Alert,
  Container,
  Row,
  Col,
  InputGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardBody,
} from 'shards-react'

import AccountOverview from '../components/AccountOverview'
import AccountBreakdown from '../components/AccountBreakdown'

import PageTitle from '../components/common/PageTitle'
import SmallStats from '../components/common/SmallStats'

const Holdings = ({
  smallStats,
  selectAccount,
  accounts,
  getHistory,
  user,
  historicQuotes,
  globalSelectedAccount,
}) => {
  const [dropdownState, setDropdownState] = useState({
    isOpen: false,
    selected: null,
  })
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [alertData, setAlertData] = useState({
    isShowing: false,
    message: '',
  })

  useEffect(() => {
    // on load set dropdown and current account state from redux
    if (globalSelectedAccount) {
      setDropdownState({
        isOpen: false,
        selected: globalSelectedAccount,
      })
      setSelectedAccount({
        ...accounts[globalSelectedAccount.value],
        value: globalSelectedAccount.value,
      })
    }

    return () => {}
  }, [])

  useEffect(() => {
    // fetch 1d stats for account overview on account switch
    if (!!selectedAccount) {
      getHistory({
        times: ['1d', 'all'],
        account: dropdownState.selected.value,
        tokens: JSON.stringify(user.tokens),
      })
    }
    return () => null
  }, [selectedAccount])

  // TODO shards dropdowns are jank... figure out a better way to do this
  const handleDropdownClick = ({ target }) => {
    const currentAccount = getFormattedAccount(target.id)

    // if drop down opened / closed with no value selected
    if (!target.id) {
      return setDropdownState({
        ...dropdownState,
        isOpen: !dropdownState.isOpen,
      })
    }

    // update account dropdown
    setDropdownState({
      isOpen: false,
      selected: currentAccount,
    })

    // set the selected account locally
    setSelectedAccount({
      ...accounts[currentAccount.value],
      value: currentAccount.value,
    })

    // dispatch selected account to redux
    selectAccount(currentAccount)
  }

  const renderAccounts = () =>
    Object.keys(accounts).map(account => {
      const formattedAccount = getFormattedAccount(account)
      return (
        <DropdownItem
          key={`${formattedAccount.value}-dropdown`}
          id={formattedAccount.value}
          active={dropdownState.selected === formattedAccount.value}
        >
          {formattedAccount.display}
        </DropdownItem>
      )
    })

  const renderSmallStats = () => {
    // make copy of default props then override if needed
    const defaultSmallStats = [...smallStats]

    // if we have account overview data, override defaults
    if (historicQuotes['1d'] && historicQuotes['all'] && selectedAccount) {
      const currDayData = historicQuotes['1d']
      const currDayResults = currDayData.results[currDayData.results.length - 1]

      const currAllData = historicQuotes['all']
      const currAllResults = currAllData.results[currAllData.results.length - 1]

      // if markets just opened and we don't have data yet
      if (
        (!currDayResults || currDayData.length === 0) &&
        alertData.isShowing === false
      ) {
        setAlertData({
          isShowing: true,
          message:
            'Markets have just opened. WST quotes are 15 minutes behind. Check back soon!',
        })
      } else if (currDayData.length !== 0 && alertData.isShowing === true) {
        setAlertData({
          isShowing: false,
          message: '',
        })
      }

      // Override cash value (buying power)
      defaultSmallStats[0] = {
        ...defaultSmallStats[0],
        value: Math.round(selectedAccount.buying_power.amount * 100) / 100,
      }

      // Override securities value
      const positions = selectedAccount.positions
      const securitesValue = positions.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.quote.amount * currentValue.quantity,
        0
      )
      defaultSmallStats[1] = {
        ...defaultSmallStats[1],
        value: Math.round(securitesValue * 100) / 100,
      }

      // override current balance
      defaultSmallStats[2] = {
        ...defaultSmallStats[2],
        value: Math.round(currDayResults.value.amount * 100) / 100,
      }

      // override net gain
      const totalAmount = currAllResults.relative_equity_earnings.amount
      defaultSmallStats[3] = {
        ...defaultSmallStats[3],
        value: Math.round(totalAmount * 100) / 100,
        percentage:
          Math.round(
            currAllResults.relative_equity_earnings.percentage * 100 * 100
          ) / 100,
        increase: totalAmount > 0 ? 'increase' : 'decrease',
        datasets: [
          {
            ...defaultSmallStats[3].datasets[0],
            backgroundColor:
              totalAmount > 0 ? 'rgba(23,198,113,0.1)' : 'rgba(255,65,105,0.1)',
            borderColor:
              totalAmount > 0 ? 'rgb(23,198,113)' : 'rgb(255,65,105)',
          },
        ],
      }

      // override day gain
      const dayAmount = currDayResults.relative_equity_earnings.amount
      defaultSmallStats[4] = {
        ...defaultSmallStats[4],
        value: Math.round(dayAmount * 100) / 100,
        percentage:
          Math.round(
            currDayResults.relative_equity_earnings.percentage * 100 * 100
          ) / 100,
        increase: dayAmount > 0 ? 'increase' : 'decrease',
        datasets: [
          {
            ...defaultSmallStats[4].datasets[0],
            backgroundColor:
              dayAmount > 0 ? 'rgba(23,198,113,0.1)' : 'rgba(255,65,105,0.1)',
            borderColor: dayAmount > 0 ? 'rgb(23,198,113)' : 'rgb(255,65,105)',
          },
        ],
      }
    }

    return defaultSmallStats.map((stats, idx) => (
      <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
        <SmallStats
          id={`small-stats-${idx}`}
          variation="1"
          chartData={stats.datasets}
          chartLabels={stats.chartLabels}
          label={stats.label}
          value={stats.value}
          percentage={stats.percentage}
          increase={stats.increase}
          decrease={stats.decrease}
        />
      </Col>
    ))
  }

  // todo move this to only update on account change
  const accountSmallStats = renderSmallStats()

  const renderTableData = () => {
    // check if we have account  data
    if (historicQuotes['1d'] && historicQuotes['all'] && selectedAccount) {
      const positions = selectedAccount.positions
      const currDayData = historicQuotes['1d']
      const currDayResults = currDayData.results[currDayData.results.length - 1]
      const portfolioValue = currDayResults.value.amount

      return positions.map(position => (
        <tr key={position.id}>
          <td>{position.stock.symbol}</td>
          <td>{position.quantity}</td>
          <td>
            {'$' + (position.book_value.amount / position.quantity).toFixed(2)}
          </td>
          <td>{'$' + position.quote.amount}</td>
          <td>
            {'$' + (position.quote.amount * position.quantity).toFixed(2)}
          </td>
          <td>
            {'$ ' +
              (
                position.quote.amount * position.quantity -
                position.book_value.amount
              ).toFixed(2)}
          </td>
          <td>
            {(
              ((position.quote.amount * position.quantity -
                position.book_value.amount) /
                position.book_value.amount) *
              100
            ).toFixed(2) + '%'}{' '}
          </td>
          <td>
            {(
              ((position.quote.amount * position.quantity) / portfolioValue) *
              100
            ).toFixed(2) + '%'}
          </td>
        </tr>
      ))
    }
  }

  const accountTableData = renderTableData()

  return (
    <>
      {alertData.isShowing && (
        <Container fluid className="px-0">
          <Alert className="mb-0 alert-warning">
            <i className="fa fa-info mx-2"></i> {alertData.message}
          </Alert>
        </Container>
      )}
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <Col lg="6" md="6" sm="6">
            <PageTitle
              title={'Account Overview'}
              subtitle="Holdings"
              className="text-md-left mb-3 w-100"
              style={{ minWidth: 300 }}
              lg="6"
              md="6"
              sm="6"
            />
          </Col>
          <Col lg="6" md="6" sm="12">
            <InputGroup className="d-flex justify-content-end align-items-center h-100 mt-2">
              <Dropdown
                id="toggle"
                open={dropdownState.isOpen}
                toggle={handleDropdownClick}
                className="h-100"
              >
                <DropdownToggle
                  caret
                  className="h-100"
                  style={{ width: '150px', fontSize: '15px' }}
                >
                  {Object.keys(accounts).length !== 0
                    ? dropdownState.selected?.display || 'Account Type'
                    : 'No Accounts!'}
                </DropdownToggle>
                <DropdownMenu right>{renderAccounts()}</DropdownMenu>
              </Dropdown>
            </InputGroup>
          </Col>
        </Row>

        {/* Portfolio Quick Look */}
        <Row>{accountSmallStats.slice(0, 3)}</Row>
        <Row>{accountSmallStats.slice(3, 6)}</Row>

        <Row>
          {/* Account Overview */}
          <Col lg="9" md="12" sm="12" className="mb-4">
            <AccountOverview account={selectedAccount} />
          </Col>
          {/* Users by Device */}
          <Col lg="3" md="12" sm="12" className="mb-4">
            <AccountBreakdown />
          </Col>
        </Row>

        <Row>
          <Col>
            <Card small className="mb-4 overflow-hidden">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Investments</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        Symbol
                      </th>
                      <th scope="col" className="border-0">
                        Quantity
                      </th>
                      <th scope="col" className="border-0">
                        Average Cost
                      </th>
                      <th scope="col" className="border-0">
                        Current Price
                      </th>
                      <th scope="col" className="border-0">
                        Market Value
                      </th>
                      <th scope="col" className="border-0">
                        Unrealized G/L
                      </th>
                      <th scope="col" className="border-0">
                        Unrealized G/L %
                      </th>
                      <th scope="col" className="border-0">
                        Portfolio %
                      </th>
                    </tr>
                  </thead>
                  <tbody>{accountTableData}</tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

Holdings.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array,
}

const randNum = () => Math.random() * (7 - 2) + 2

Holdings.defaultProps = {
  smallStats: [
    {
      label: 'Cash Value',
      value: '---',
      increase: 'neutral',
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: '6', sm: '6' },
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          backgroundColor: 'rgb(0,184,216, 0.1)',
          borderColor: 'rgb(0,123,255)',
          data: [
            randNum(),
            randNum(),
            randNum(),
            randNum(),
            randNum(),
            randNum(),
            randNum(),
          ],
        },
      ],
    },
    {
      label: 'Securities Value',
      value: '---',
      increase: 'neutral',
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: '6', sm: '6' },
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          backgroundColor: 'rgb(0,184,216, 0.1)',
          borderColor: 'rgb(0,123,255)',
          data: [
            randNum(),
            randNum(),
            randNum(),
            randNum(),
            randNum(),
            randNum(),
            randNum(),
          ],
        },
      ],
    },
    {
      label: 'Total Account Value',
      value: '---',
      increase: 'neutral',
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: '6', sm: '6' },
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          backgroundColor: 'rgb(0,184,216, 0.1)',
          borderColor: 'rgb(0,123,255)',
          data: [
            randNum(),
            randNum(),
            randNum(),
            randNum(),
            randNum(),
            randNum(),
            randNum(),
          ],
        },
      ],
    },
    {
      label: 'Net Gain',
      value: '---',
      percentage: '0.00',
      increase: 'neutral',
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: '6', sm: '6' },
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          backgroundColor: 'rgb(0,184,216, 0.1)',
          borderColor: 'rgb(0,123,255)',
          data: [
            randNum(),
            randNum(),
            randNum(),
            randNum(),
            randNum(),
            randNum(),
            randNum(),
          ],
        },
      ],
    },
    {
      label: 'Day Gain',
      value: '---',
      percentage: '0.00',
      increase: 'neutral',
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: '6', sm: '6' },
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          backgroundColor: 'rgb(0,184,216, 0.1)',
          borderColor: 'rgb(0,123,255)',
          data: [
            randNum(),
            randNum(),
            randNum(),
            randNum(),
            randNum(),
            randNum(),
            randNum(),
          ],
        },
      ],
    },
  ],
}

const mapStateToProps = state => ({
  accounts: state.trade.accounts,
  user: state.auth.user,
  historicQuotes: state.trade.historicQuotes,
  globalSelectedAccount: state.trade.selectedAccount,
})

const mapDispatchToProps = {
  selectAccount: tradeActions.selectAccount,
  getHistory: tradeActions.getHistoricalQuotes,
}

export default connect(mapStateToProps, mapDispatchToProps)(Holdings)
