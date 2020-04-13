import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { tradeActions } from '../../redux/actions'

import {
  Alert,
  Container,
  Row,
  Col,
  InputGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardBody,
} from 'shards-react'

const gainStyles = {
  green: '#17c671',
  red: '#c4183c',
}

const List = ({ items, listTitle }) => {
  const renderListItems = () => {
    return items.map(item => (
      <tr key={item.id}>
        <td>
          <div style={{ fontSize: 20 }}>
            <b>{item.stock.symbol}</b>
          </div>

          <div className="pb-1" style={{ fontWeight: '300' }}>
            {item.stock.name}
          </div>
        </td>
        <td>{'$ ' + item.quote.amount}</td>
        <td
          style={{
            color:
              item.quote.previous_close > item.quote.amount
                ? gainStyles.red
                : gainStyles.green,
          }}
        >
          {(item.quote.amount - item.quote.previous_close).toFixed(2)}
        </td>
        <td
          style={{
            color:
              item.quote.previous_close > item.quote.amount
                ? gainStyles.red
                : gainStyles.green,
          }}
        >
          {((item.quote.amount / item.quote.previous_close - 1) * 100).toFixed(
            2
          ) + '%'}
        </td>
        <td>{item.stock.primary_exchange}</td>
      </tr>
    ))
  }

  const listData = renderListItems()

  return (
    <Container fluid className="main-content-container px-4">
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">{listTitle}</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Security
                    </th>
                    <th scope="col" className="border-0">
                      Price
                    </th>
                    <th scope="col" className="border-0">
                      $ Change
                    </th>
                    <th scope="col" className="border-0">
                      % Change
                    </th>
                    <th scope="col" className="border-0">
                      Exchange
                    </th>
                  </tr>
                </thead>
                <tbody>{listData}</tbody>
              </table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default List
