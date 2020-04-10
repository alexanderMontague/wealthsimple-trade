import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'

import { tradeActions } from '../redux/actions'

import MainChart from './MainChart'

class AccountOverview extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedRange: '1d',
      selectedRangeData: [],
      portfolioRanges: ['1d', '1w', '1m', '3m', '1y', 'All'],
      chartData: {},
    }
  }

  componentDidMount() {
    this.renderChart()
  }

  componentDidUpdate(prevProps) {
    // if quotes have not changed, don't re-render chart
    if (prevProps.historicQuotes !== this.props.historicQuotes)
      this.renderChart()
  }

  selectRange = selectedRange => {
    const { selectedAccount, getHistory, user } = this.props

    // return if no account is selected yet
    if (!selectedAccount) return
    getHistory({
      times: [selectedRange.toLowerCase()],
      account: selectedAccount.value,
      tokens: JSON.stringify(user.tokens),
    })

    this.setState({ selectedRange })
  }

  renderChart = () => {
    const { selectedAccount, historicQuotes, chartData, accounts } = this.props
    const { selectedRange } = this.state
    const selectedAccountData = accounts[selectedAccount?.value]
    const currHistoricData =
      historicQuotes[selectedRange.toLowerCase()]?.results

    const chartDefaultData = { ...chartData }

    // if the user selected a new range and we have data for it
    if (currHistoricData) {
      // get values
      const mainLabel = `${selectedAccount.display} Account (${selectedAccountData.base_currency})`
      const dataPoints = currHistoricData.map(point => point.value.amount)
      const labels = currHistoricData.map(point =>
        moment
          .utc(point.date)
          .local()
          .format('MMM DD, YYYY h:mm A')
      )

      // override default data
      chartDefaultData.labels = labels
      chartDefaultData.datasets = [
        {
          ...chartDefaultData.datasets[0],
          label: mainLabel,
          data: dataPoints,
        },
      ]
    }

    const chartOptions = {
      ...{
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
      ...this.props.chartOptions,
    }

    this.setState({
      chartData: {
        data: chartDefaultData,
        options: chartOptions,
      },
    })
  }

  render() {
    const { selectedAccount, isHistoryLoading } = this.props

    return (
      <MainChart
        type="LineWithLine"
        chartData={this.state.chartData}
        onRangeChange={this.selectRange}
        chartTitle={
          selectedAccount
            ? `${selectedAccount.display} Account Details`
            : 'Select an Account'
        }
        loading={isHistoryLoading}
      />
    )
  }
}

AccountOverview.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart dataset.
   */
  chartData: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object,
}

AccountOverview.defaultProps = {
  chartData: {
    labels: Array.from(new Array(30), (_, i) => (i === 0 ? 1 : i)),
    datasets: [
      {
        label: 'Your Account',
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
}

const mapStateToProps = state => ({
  user: state.auth.user,
  selectedAccount: state.trade.selectedAccount,
  accounts: state.trade.accounts,
  historicQuotes: state.trade.historicQuotes,
  isHistoryLoading: state.trade.isHistoryLoading,
})

const mapDispatchToProps = {
  getHistory: tradeActions.getHistoricalQuotes,
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountOverview)
