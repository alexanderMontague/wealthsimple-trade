import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row, Col } from 'shards-react'
import moment from 'moment'

import { tradeActions } from '../redux/actions'

import MainChart from '../components/MainChart'
import SecurityList from '../components/SecurityList'

import PageTitle from './../components/common/PageTitle'
import NewDraft from './../components/blog/NewDraft'
import Discussions from './../components/blog/Discussions'

const Trade = ({ chartData }) => {
  // state selection
  const selectedAccount = useSelector(state => state.trade.selectedAccount)
  const accounts = useSelector(state => state.trade.accounts)
  const selectedSecurity = useSelector(state => state.trade.selectedSecurity)
  const isSelectedSecurityLoading = useSelector(
    state => state.trade.isSelectedSecurityLoading
  )

  // dispatching
  const dispatch = useDispatch()

  // select security from portfolio
  const selectSecurity = security => {
    dispatch(tradeActions.selectSecurity(security))
  }

  // internal state
  const [selectedRange, setSelectedRange] = useState('1d')
  const [currentChartData, setCurrentChartData] = useState(chartData)

  // useEffects

  // reset selected range when security changes
  useEffect(() => setSelectedRange('1d'), [selectedSecurity?.id])

  useEffect(() => {
    // if we have data for a selected range, generate new chart data
    if (!!selectedSecurity?.historicQuotes?.[selectedRange]) {
      getChartData()
    }
  }, [selectedSecurity?.historicQuotes?.[selectedRange]])

  // current selected account
  const currentAccount = selectedAccount
    ? accounts[selectedAccount.value]
    : null

  // fetch historic data about selected security for chosen range
  const onRangeChange = selectedRange => {
    // don't update anything if a security is not yet selected
    if (!selectedSecurity) return

    setSelectedRange(selectedRange)

    if (!selectedSecurity?.historicQuotes?.[selectedRange]) {
      dispatch(
        tradeActions.getSecurityHistory({
          securityId: selectedSecurity.id,
          time: selectedRange,
        })
      )
    }
  }

  const getChartData = () => {
    const defaultChartData = { ...chartData }

    const [_, ...currHistoricQuotes] = selectedSecurity.historicQuotes[
      selectedRange
    ]
    const mainLabel = `[${selectedSecurity.symbol}] - ${selectedSecurity.name}`
    const dataPoints = currHistoricQuotes.map(
      point => point.ask || point.adj_close
    )
    const labels = currHistoricQuotes.map(point =>
      moment(`${point.date} ${point.time}`, 'YYYY-MM-DD HH:mm:ss').format(
        'MMM DD, YYYY h:mm A'
      )
    )

    // override default data
    defaultChartData.data.labels = labels
    defaultChartData.data.datasets = [
      {
        ...defaultChartData.data.datasets[0],
        label: mainLabel,
        data: dataPoints,
      },
    ]

    setCurrentChartData(defaultChartData)
  }

  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="Buy and Sell"
          subtitle="Trade"
          className="text-sm-left mb-3"
        />
      </Row>

      <Row>
        {/* Left Column */}
        <Col lg="8" md="12" sm="12" className="mb-4">
          <Col className="mb-4 p-0">
            <MainChart
              overrideRanges={['1d', '1w', '1m', '3m', '1y', '5y']}
              chartData={currentChartData}
              chartTitle={
                selectedSecurity ? selectedSecurity.name : 'Selected Option'
              }
              onRangeChange={onRangeChange}
              loading={isSelectedSecurityLoading}
            />
          </Col>
          <Col className="mb-4 p-0">
            <NewDraft />
          </Col>
        </Col>

        {/* Right Column */}
        <Col lg="4" md="12" sm="12" className="mb-4">
          <Col className="mb-4 p-0">
            <SecurityList
              currentAccount={currentAccount}
              selectSecurity={selectSecurity}
              selectedSecurity={selectedSecurity}
            />
          </Col>
          <Col className="mb-4 p-0">
            <Discussions />
          </Col>
        </Col>
      </Row>
    </Container>
  )
}

Trade.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array,
}

Trade.defaultProps = {
  chartData: {
    data: {
      labels: Array.from(new Array(30), (_, i) => (i === 0 ? 1 : i)),
      datasets: [
        {
          label: '[ABCD] - Selected Option',
          fill: 'start',
          data: [
            500,
            800,
            320,
            180,
            240,
            320,
            230,
            650,
            590,
            1200,
            750,
            940,
            1420,
            1200,
            960,
            1450,
            1820,
            2800,
            2102,
            1920,
            3920,
            3202,
            3140,
            2800,
            3200,
            3200,
            3400,
            2910,
            3100,
            4250,
          ],
          backgroundColor: 'rgba(0,123,255,0.1)',
          borderColor: 'rgba(0,123,255,1)',
          pointBackgroundColor: '#ffffff',
          pointHoverBackgroundColor: 'rgb(0,123,255)',
          borderWidth: 1.5,
          pointRadius: 0,
          pointHoverRadius: 3,
        },
      ],
    },
    options: {
      responsive: true,
      legend: {
        position: 'top',
      },
      elements: {
        line: {
          // A higher value makes the line look skewed at this ratio.
          tension: 0.3,
        },
        point: {
          radius: 0,
        },
      },
      scales: {
        xAxes: [
          {
            gridLines: false,
            ticks: {
              // keep label data, but don't render them on axis
              callback() {
                return ''
              },
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              callback(tick) {
                // format the amounts to show dollars
                return `$${tick}`
              },
            },
          },
        ],
      },
      hover: {
        mode: 'nearest',
        intersect: false,
      },
      tooltips: {
        custom: false,
        mode: 'nearest',
        intersect: false,
      },
    },
  },
}

export default Trade
