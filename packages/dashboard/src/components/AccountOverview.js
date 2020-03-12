import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  CardFooter,
} from 'shards-react'

import RangeDatePicker from './common/RangeDatePicker'
import Chart from '../utils/chart'

class AccountOverview extends React.Component {
  constructor(props) {
    super(props)

    this.canvasRef = React.createRef()

    this.state = {
      selectedRange: '1d',
    }

    this.portfolioRanges = ['1d', '1w', '1m', '3m', '1y', 'All']
  }

  componentDidMount() {
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
                callback(tick, index) {
                  // Jump every 7 values on the X axis labels to avoid clutter.
                  return index % 7 !== 0 ? '' : tick
                },
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                suggestedMax: 45,
                callback(tick) {
                  if (tick === 0) {
                    return tick
                  }
                  // Format the amounts using Ks for thousands.
                  return tick > 999 ? `${(tick / 1000).toFixed(1)}K` : tick
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

    const BlogUsersOverview = new Chart(this.canvasRef.current, {
      type: 'LineWithLine',
      data: this.props.chartData,
      options: chartOptions,
    })

    // They can still be triggered on hover.
    const buoMeta = BlogUsersOverview.getDatasetMeta(0)
    buoMeta.data[0]._model.radius = 0
    buoMeta.data[
      this.props.chartData.datasets[0].data.length - 1
    ]._model.radius = 0

    // Render the chart.
    BlogUsersOverview.render()
  }

  selectRange = event => {
    const selectedRange = event.target.value
    this.setState({ selectedRange })
  }

  renderButtonas = () =>
    this.portfolioRanges.map(range => (
      <Button
        key={`${range}-button`}
        size="md"
        className="btn-white"
        style={{
          width: 100,
          backgroundColor: this.state.selectedRange === range && '#007bff',
          color: this.state.selectedRange === range && '#ffffff',
        }}
        value={range}
        onClick={this.selectRange}
      >
        {range}
      </Button>
    ))

  render() {
    const { account } = this.props

    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{`${account} Account Details`}</h6>
        </CardHeader>
        <CardBody className="pt-0">
          <canvas
            height="120"
            ref={this.canvasRef}
            style={{ maxWidth: '100% !important' }}
          />
        </CardBody>
        <CardFooter className="d-flex justify-content-around">
          {this.renderButtonas()}
        </CardFooter>
      </Card>
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
        label: 'Current Month',
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
      {
        label: 'Past Month',
        fill: 'start',
        data: [
          380,
          430,
          120,
          230,
          410,
          740,
          472,
          219,
          391,
          229,
          400,
          203,
          301,
          380,
          291,
          620,
          700,
          300,
          630,
          402,
          320,
          380,
          289,
          410,
          300,
          530,
          630,
          720,
          780,
          1200,
        ],
        backgroundColor: 'rgba(255,65,105,0.1)',
        borderColor: 'rgba(255,65,105,1)',
        pointBackgroundColor: '#ffffff',
        pointHoverBackgroundColor: 'rgba(255,65,105,1)',
        borderDash: [3, 3],
        borderWidth: 1,
        pointRadius: 0,
        pointHoverRadius: 2,
        pointBorderColor: 'rgba(255,65,105,1)',
      },
    ],
  },
}

const mapStateToProps = state => ({
  account: state.trade.account,
})

export default connect(mapStateToProps)(AccountOverview)
