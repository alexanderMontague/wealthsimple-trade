import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, CardHeader, CardBody, Row, Col, Button } from 'shards-react'

const BuySell = ({ title, selectedSecurity, toggleModal }) => {
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
              <Col className="d-flex justify-content-between px-4">
                <span>Open</span>
                <span style={{ fontWeight: 'bold', textAlign: 'right' }}>
                  {selectedSecurity.quote.open}
                </span>
              </Col>
              <Col className="d-flex justify-content-between px-4">
                <span>High</span>
                <span style={{ fontWeight: 'bold', textAlign: 'right' }}>
                  {selectedSecurity.quote.high}
                </span>
              </Col>
              <Col className="d-flex justify-content-between px-4">
                <span>Low</span>
                <span style={{ fontWeight: 'bold', textAlign: 'right' }}>
                  {selectedSecurity.quote.low}
                </span>
              </Col>
            </Row>
            <Row className="py-3" style={{ borderBottom: 'solid 1px #e1e5eb' }}>
              <Col className="d-flex justify-content-between px-4">
                <span>Market Cap</span>
                <span style={{ fontWeight: 'bold', textAlign: 'right' }}>
                  {selectedSecurity.fundamentals.market_cap} Million
                </span>
              </Col>
              <Col className="d-flex justify-content-between px-4">
                <span>Volume</span>
                <span style={{ fontWeight: 'bold', textAlign: 'right' }}>
                  {selectedSecurity.quote.volume}
                </span>
              </Col>
              <Col className="d-flex justify-content-between px-4">
                <span>Average Volume</span>
                <span style={{ fontWeight: 'bold', textAlign: 'right' }}>
                  {selectedSecurity.fundamentals.avg_volume}
                </span>
              </Col>
            </Row>
            <Row className="py-3" style={{ borderBottom: 'solid 1px #e1e5eb' }}>
              <Col className="d-flex justify-content-between px-4">
                <span>52 Week High</span>
                <span style={{ fontWeight: 'bold', textAlign: 'right' }}>
                  {selectedSecurity.fundamentals.high_52_week}
                </span>
              </Col>
              <Col className="d-flex justify-content-between px-4">
                <span>52 Week Low</span>
                <span style={{ fontWeight: 'bold', textAlign: 'right' }}>
                  {selectedSecurity.fundamentals.low_52_week}
                </span>
              </Col>
              <Col className="d-flex justify-content-between px-4">
                <span>Yield</span>
                <span style={{ fontWeight: 'bold', textAlign: 'right' }}>
                  {selectedSecurity.fundamentals.yield || '-'}
                </span>
              </Col>
            </Row>
            <Row className="py-3">
              <Col className="d-flex justify-content-between px-4">
                <span>Price Earnings Ratio</span>
                <span style={{ fontWeight: 'bold', textAlign: 'right' }}>
                  {selectedSecurity.fundamentals.pe_ratio}
                </span>
              </Col>
              <Col className="d-flex justify-content-between px-4">
                <span>Exchange</span>
                <span style={{ fontWeight: 'bold', textAlign: 'right' }}>
                  {selectedSecurity.exchange}
                </span>
              </Col>
              <Col className="px-4" />
            </Row>
            <Row className="d-flex justify-content-around py-3">
              <Col className="mx-4">
                <Button
                  theme="primary"
                  block
                  onClick={() => toggleModal('buy')}
                >
                  Buy
                </Button>
              </Col>
              <Col className="mx-4">
                {selectedSecurity.isOwned && (
                  <Button
                    theme="secondary"
                    block
                    onClick={() => toggleModal('sell')}
                  >
                    Sell
                  </Button>
                )}
              </Col>
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
