import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  FormSelect,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from 'shards-react'

import Chart from '../utils/chart'
import chartColors from '../assets/chartColors'

class AccountBreakdown extends React.Component {
  constructor(props) {
    super(props)

    this.chartRef = null
    this.canvasRef = React.createRef()
  }

  componentDidMount() {
    this.renderChart()
  }

  componentDidUpdate(prevProps, props) {
    // if selected account has changed re-render chart
    this.renderChart()
  }

  renderChart = () => {
    const {
      selectedAccount,
      chartData: defaultChartData,
      accounts,
      historicQuotes,
    } = this.props
    const currDayData = historicQuotes['1d']
    const chartData = { ...defaultChartData }

    // if the user selected a new range and we have data for it
    if (currDayData) {
      // get data from portfolio
      const currDayResults = currDayData.results[currDayData.results.length - 1]
      const portfolioValue = currDayResults.value.amount
      const selectedAccountData = accounts[selectedAccount?.value]
      const positions = selectedAccountData?.positions

      // get option worth percentage
      const dataPoints = positions.map(point =>
        Number(
          (
            ((point.quote.amount * point.quantity) / portfolioValue) *
            100
          ).toFixed(2)
        )
      )
      // push in cash percentage
      dataPoints.push(
        Number(
          (
            (selectedAccountData.current_balance.amount / portfolioValue) *
            100
          ).toFixed(2)
        )
      )

      // option labels with name and ticker
      const labels = positions.map(
        position => `${position.stock.name} (${position.stock.symbol})`
      )
      // push in cash label
      labels.push('Cash')

      // create colors for each security
      const colors = labels.map((_, i) => chartColors[i])

      // override default data
      chartData.labels = labels
      chartData.datasets = [
        {
          ...chartData.datasets[0],
          data: dataPoints,
          backgroundColor: colors,
        },
      ]
    }

    // to prevent chart re-render
    // if we don't have data but default chart has already been rendered
    if (!currDayData && this.chartRef) return

    const chartConfig = {
      type: 'pie',
      data: chartData,
      options: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 10,
            boxWidth: 20,
          },
        },
        cutoutPercentage: 0,
        tooltips: {
          custom: false,
          mode: 'index',
          position: 'nearest',
          callbacks: {
            label: function(item, data) {
              const dataIndex = item.index
              return `${data.labels[dataIndex]} ${data.datasets[0].data[dataIndex]}%`
            },
          },
        },
      },
    }

    // remove old chart
    if (this.chartRef) {
      this.chartRef.destroy()
    }

    this.chartRef = new Chart(this.canvasRef.current, chartConfig)
  }

  render() {
    const { title } = this.props
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <CardBody className="d-flex py-0">
          <canvas
            height="350"
            ref={this.canvasRef}
            className="blog-users-by-device m-auto"
          />
        </CardBody>
      </Card>
    )
  }
}

AccountBreakdown.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart config object.
   */
  chartConfig: PropTypes.object,
  /**
   * The chart data.
   */
  chartData: PropTypes.object,
}

AccountBreakdown.defaultProps = {
  title: 'Asset Value Breakdown',
  chartData: {
    datasets: [
      {
        hoverBorderColor: '#ffffff',
        data: [68.3, 31.7],
        backgroundColor: [chartColors[2], chartColors[4]],
      },
    ],
    labels: ['Cash', 'Securities'],
  },
}

const mapStateToProps = state => ({
  accounts: state.trade.accounts,
  selectedAccount: state.trade.selectedAccount,
  historicQuotes: state.trade.historicQuotes,
})

export default connect(mapStateToProps)(AccountBreakdown)
