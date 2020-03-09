import React, { useState } from 'react'
import PropTypes from 'prop-types'
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

import PageTitle from '../components/common/PageTitle'
import SmallStats from '../components/common/SmallStats'
import UsersByDevice from '../components/blog/UsersByDevice'
import NewDraft from '../components/blog/NewDraft'
import Discussions from '../components/blog/Discussions'
import TopReferrals from '../components/common/TopReferrals'

const Holdings = ({ smallStats }) => {
  const [dropdownState, setDropdownState] = useState({
    isOpen: false,
    selected: '',
  })

  const handleDropdownClick = event =>
    !event.target.id
      ? setDropdownState({
          ...dropdownState,
          isOpen: !dropdownState.isOpen,
        })
      : setDropdownState({ isOpen: false, selected: event.target.id })

  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <Col lg="6" md="6" sm="6">
          <PageTitle
            title="Account Overview"
            subtitle="Holdings"
            className="text-md-left mb-3 w-100"
            lg="6"
            md="6"
            sm="6"
          />
        </Col>
        <Col lg="6" md="6" sm="6">
          <InputGroup className="d-flex justify-content-center align-items-center h-100">
            <Dropdown
              id="toggle"
              open={dropdownState.isOpen}
              toggle={handleDropdownClick}
            >
              <DropdownToggle caret>Account Type</DropdownToggle>
              <DropdownMenu small right>
                <DropdownItem
                  onClick={handleDropdownClick}
                  id="tfsa"
                  active={dropdownState.selected === 'tfsa'}
                >
                  TFSA
                </DropdownItem>
                <DropdownItem
                  id="rrsp"
                  onClick={handleDropdownClick}
                  active={dropdownState.selected === 'rrsp'}
                >
                  RRSP
                </DropdownItem>
                <DropdownItem
                  id="test"
                  onClick={handleDropdownClick}
                  active={dropdownState.selected === 'test'}
                >
                  Something else here
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </InputGroup>
        </Col>
      </Row>

      {/* Small Stats Blocks */}
      <Row>
        {smallStats.map((stats, idx) => (
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
        ))}
      </Row>

      <Row>
        {/* Users Overview */}
        <Col lg="12" md="12" sm="12" className="mb-4">
          <AccountOverview />
        </Col>

        {/* Users by Device */}
        <Col lg="4" md="6" sm="12" className="mb-4">
          <UsersByDevice />
        </Col>

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

Holdings.defaultProps = {
  smallStats: [
    {
      label: 'Posts',
      value: '2,390',
      percentage: '4.7%',
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: '6', sm: '6' },
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          backgroundColor: 'rgba(0, 184, 216, 0.1)',
          borderColor: 'rgb(0, 184, 216)',
          data: [1, 2, 1, 3, 5, 4, 7],
        },
      ],
    },
    {
      label: 'Pages',
      value: '182',
      percentage: '12.4',
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: '6', sm: '6' },
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          backgroundColor: 'rgba(23,198,113,0.1)',
          borderColor: 'rgb(23,198,113)',
          data: [1, 2, 3, 3, 3, 4, 4],
        },
      ],
    },
    {
      label: 'Comments',
      value: '8,147',
      percentage: '3.8%',
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: '4', sm: '6' },
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          backgroundColor: 'rgba(255,180,0,0.1)',
          borderColor: 'rgb(255,180,0)',
          data: [2, 3, 3, 3, 4, 3, 3],
        },
      ],
    },
    {
      label: 'New Customers',
      value: '29',
      percentage: '2.71%',
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: '4', sm: '6' },
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          backgroundColor: 'rgba(255,65,105,0.1)',
          borderColor: 'rgb(255,65,105)',
          data: [1, 7, 1, 3, 1, 4, 8],
        },
      ],
    },
    {
      label: 'Subscribers',
      value: '17,281',
      percentage: '2.4%',
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: '4', sm: '6' },
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          backgroundColor: 'rgb(0,123,255,0.1)',
          borderColor: 'rgb(0,123,255)',
          data: [3, 2, 3, 2, 4, 5, 4],
        },
      ],
    },
  ],
}

export default Holdings
