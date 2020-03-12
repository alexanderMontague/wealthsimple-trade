import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { tradeActions } from '../redux/actions'

import { getFormattedAccount } from '../utils/helpers'

import {
  Container,
  Row,
  Col,
  InputGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'shards-react'

import AccountOverview from '../components/AccountOverview'
import AccountBreakdown from '../components/AccountBreakdown'

import PageTitle from '../components/common/PageTitle'
import SmallStats from '../components/common/SmallStats'
import NewDraft from '../components/blog/NewDraft'
import Discussions from '../components/blog/Discussions'
import TopReferrals from '../components/common/TopReferrals'

const Holdings = ({ smallStats, selectAccount, accounts }) => {
  const [dropdownState, setDropdownState] = useState({
    isOpen: false,
    selected: null,
  })
  const [selectedAccount, setSelectedAccount] = useState(null)

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

    // set current account from all
    setSelectedAccount(accounts[currentAccount.value])

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
        console.log(selectedAccount)

        return smallStats.map((stats, idx) => (
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

  return (
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
      <Row>
        {renderSmallStats()}
      </Row>

      <Row>
        {/* Account Overview */}
        <Col lg="9" md="12" sm="12" className="mb-4">
          <AccountOverview />
        </Col>
        {/* Users by Device */}
        <Col lg="3" md="12" sm="12" className="mb-4">
          <AccountBreakdown />
        </Col>
      </Row>

      <Row>
        {/* New Draft */}
        <Col lg="4" md="6" sm="12" className="mb-4">
          <NewDraft />
        </Col>

        {/* Discussions */}
        <Col lg="5" md="12" sm="12" className="mb-4">
          <Discussions />
        </Col>

        {/* Top Referrals */}
        <Col lg="3" md="12" sm="12" className="mb-4">
          <TopReferrals />
        </Col>
      </Row>
    </Container>
  )
}

Holdings.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array,
}

const randNum = () => Math.random() * (7 - 2) + 2;

Holdings.defaultProps = {
  smallStats: [
    {
      label: 'Current Balance',
      value: "---",
      percentage: '0.00%',
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
          data: [randNum(), randNum(),randNum(),randNum(),randNum(),randNum(),randNum()],
        },
      ],
    },
    {
      label: 'Day Gain',
      value: "---",
      percentage: '0.00%',
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
          data: [randNum(), randNum(),randNum(),randNum(),randNum(),randNum(),randNum()],
        },
      ],
    },
    {
      label: 'Net Gain',
      value: "---",
      percentage: '0.00%',
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
          data: [randNum(), randNum(),randNum(),randNum(),randNum(),randNum(),randNum()],
        },
      ],
    },
  ],
}

const mapStateToProps = state => ({
  accounts: state.trade.accounts,
})

const mapDispatchToProps = {
  selectAccount: tradeActions.selectAccount,
}

export default connect(mapStateToProps, mapDispatchToProps)(Holdings)
