import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardHeader, CardBody, Row, Col, Button } from 'shards-react'

const BuySell = ({ title, selectedSecurity }) => {
  console.log(selectedSecurity)
  return (
    <Card small className="h-100">
      {/* Card Header */}
      <CardHeader className="border-bottom">
        <h6 className="m-0">{title}</h6>
      </CardHeader>

      <CardBody className="d-flex flex-column">
        {!selectedSecurity ? (
          'No Security Selected'
        ) : !selectedSecurity?.fundamentals ? (
          'Loading...'
        ) : (
          <>
            <Row className="pb-3" style={{ borderBottom: 'solid 1px #e1e5eb' }}>
              <Col className="d-flex justify-content-between px-5">
                <span>Open</span>
                <span style={{ fontWeight: 'bold' }}>
                  {selectedSecurity.quote.open}
                </span>
              </Col>
              <Col className="d-flex justify-content-between px-5">
                <span>High</span>
                <span style={{ fontWeight: 'bold' }}>
                  {selectedSecurity.quote.high}
                </span>
              </Col>
              <Col className="d-flex justify-content-between px-5">
                <span>Low</span>
                <span style={{ fontWeight: 'bold' }}>
                  {selectedSecurity.quote.low}
                </span>
              </Col>
            </Row>
            <Row className="py-3" style={{ borderBottom: 'solid 1px #e1e5eb' }}>
              <Col className="d-flex justify-content-between px-5">
                <span>Market Cap</span>
                <span style={{ fontWeight: 'bold' }}>
                  {selectedSecurity.fundamentals.market_cap} Million
                </span>
              </Col>
              <Col className="d-flex justify-content-between px-5">
                <span>Volume</span>
                <span style={{ fontWeight: 'bold' }}>
                  {selectedSecurity.quote.volume}
                </span>
              </Col>
              <Col className="d-flex justify-content-between px-5">
                <span>Average Volume</span>
                <span style={{ fontWeight: 'bold' }}>
                  {selectedSecurity.fundamentals.avg_volume}
                </span>
              </Col>
            </Row>
            <Row className="py-3" style={{ borderBottom: 'solid 1px #e1e5eb' }}>
              <Col className="d-flex justify-content-between px-5">
                <span>52 Week High</span>
                <span style={{ fontWeight: 'bold' }}>
                  {selectedSecurity.fundamentals.high_52_week}
                </span>
              </Col>
              <Col className="d-flex justify-content-between px-5">
                <span>52 Week Low</span>
                <span style={{ fontWeight: 'bold' }}>
                  {selectedSecurity.fundamentals.low_52_week}
                </span>
              </Col>
              <Col className="d-flex justify-content-between px-5">
                <span>Yield</span>
                <span style={{ fontWeight: 'bold' }}>
                  {selectedSecurity.fundamentals.yield || '-'}
                </span>
              </Col>
            </Row>
            <Row className="pt-3">
              <Col className="d-flex justify-content-between px-5">
                <span>Price Earnings Ratio</span>
                <span style={{ fontWeight: 'bold' }}>
                  {selectedSecurity.fundamentals.pe_ratio}
                </span>
              </Col>
              <Col className="d-flex justify-content-between px-5">
                <span>Exchange</span>
                <span style={{ fontWeight: 'bold' }}>
                  {selectedSecurity.exchange}
                </span>
              </Col>
              <Col className="px-5" />
            </Row>
          </>
        )}
      </CardBody>
    </Card>
  )
}

BuySell.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  selectedSecurity: PropTypes.object,
}

BuySell.defaultProps = {
  title: 'Create an order',
}

export default BuySell
