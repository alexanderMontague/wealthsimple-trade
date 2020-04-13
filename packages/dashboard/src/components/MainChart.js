import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  CardFooter,
  Row,
  Col,
} from 'shards-react'
import { ClipLoader } from 'react-spinners'

const MainChart = ({
  overrideRanges,
  portfolioRanges,
  onRangeChange,
  type = 'LineWithLine',
  chartData,
  chartTitle,
  loading = false,
}) => {
  const canvasRef = React.createRef()

  const [chartRef, setChartRef] = useState(null)
  const [selectedRange, setselectedRange] = useState('1d')

  // reset range selection on title change
  useEffect(() => {
    setselectedRange('1d')
  }, [chartTitle])

  useEffect(() => {
    if (chartData?.data) {
      renderChart()
    }
  }, [chartData?.data?.datasets?.[0]?.data])

  const onRangeClick = e => {
    // update internal selected state
    const selectedRange = e.target.value
    setselectedRange(selectedRange)

    // trigger any external range change actions
    onRangeChange && onRangeChange(selectedRange)
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
    (overrideRanges || portfolioRanges).map(range => (
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
        <Row>
          <Col className="col-10">
            <h6 className="m-0">{chartTitle}</h6>
          </Col>
          <Col className="col-2">
            <ClipLoader loading={loading} size={20} color="#007bff" />
          </Col>
        </Row>
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

MainChart.propTypes = {
  portfolioRanges: PropTypes.array,
  onRangeChange: PropTypes.func,
  type: PropTypes.string,
  chartdata: PropTypes.object,
  chartTitle: PropTypes.string,
}

export default MainChart
