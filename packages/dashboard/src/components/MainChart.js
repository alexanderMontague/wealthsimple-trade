import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Card, CardHeader, CardBody, Button, CardFooter } from 'shards-react'

const MainChart = ({
  portfolioRanges,
  onRangeChange,
  type,
  chartData,
  chartTitle,
}) => {
  const canvasRef = React.createRef()

  const [chartRef, setChartRef] = useState(null)
  const [selectedRange, setselectedRange] = useState('1d')

  useEffect(() => {
    if (chartData?.data) {
      renderChart()
    }
  }, [chartData])

  const onRangeClick = e => {
    // update internal selected state
    const selectedRange = e.target.value
    setselectedRange(selectedRange)

    // trigger any external range change actions
    onRangeChange(selectedRange)
  }

  const renderChart = () => {
    // remove old chart
    if (chartRef) {
      chartRef.destroy()
    }

    setChartRef(
      new Chart(canvasRef.current, {
        type,
        data: chartData.data,
        options: chartData.options,
      })
    )
  }

  const renderButtons = () =>
    portfolioRanges.map(range => (
      <Button
        key={`${range}-button`}
        size="md"
        className="btn-white"
        style={{
          width: 100,
          backgroundColor: selectedRange === range && '#007bff',
          color: selectedRange === range && '#ffffff',
        }}
        value={range}
        onClick={onRangeClick}
      >
        {range}
      </Button>
    ))

  return (
    <Card small className="h-100">
      <CardHeader className="border-bottom">
        <h6 className="m-0">{chartTitle}</h6>
      </CardHeader>
      <CardBody className="pt-0">
        <canvas
          height="120"
          ref={canvasRef}
          style={{ maxWidth: '100% !important' }}
        />
      </CardBody>
      <CardFooter className="d-flex justify-content-around">
        {renderButtons()}
      </CardFooter>
    </Card>
  )
}

MainChart.defaultProps = {
  portfolioRanges: ['1d', '1w', '1m', '3m', '1y', 'All'],
}

MainChart.PropTypes = {
  portfolioRanges: PropTypes.array,
  onRangeChange: PropTypes.function,
  type: PropTypes.string,
  chartdata: PropTypes.object,
  chartTitle: PropTypes.string,
}

export default MainChart
