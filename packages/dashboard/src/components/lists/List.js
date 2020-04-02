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




const List = ({
  accounts,
  user,
  historicQuotes,
  globalSelectedAccount,
}) => {
  

  

  return (
     <Container fluid className="main-content-container px-4">

        <Row>
            <Col>
                <Card small className="mb-4">
                    <CardHeader className="border-bottom">
                        <h6 className="m-0">Active Users</h6>
                    </CardHeader>
                    <CardBody className="p-0 pb-3">
                        <table className="table mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th scope="col" className="border-0">
                                        #
                                    </th>
                                    <th scope="col" className="border-0">
                                        First Name
                                    </th>
                                    <th scope="col" className="border-0">
                                        Last Name
                                    </th>
                                    <th scope="col" className="border-0">
                                        Country
                                    </th>
                                    <th scope="col" className="border-0">
                                        City
                                    </th>
                                    <th scope="col" className="border-0">
                                        Phone
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>Ali</td>
                                <td>Kerry</td>
                                <td>Russian Federation</td>
                                <td>Gdańsk</td>
                                <td>107-0339</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Ali</td>
                                <td>Kerry</td>
                                <td>Russian Federation</td>
                                <td>Gdańsk</td>
                                <td>107-0339</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Ali</td>
                                <td>Kerry</td>
                                <td>Russian Federation</td>
                                <td>Gdańsk</td>
                                <td>107-0339</td>
                            </tr>
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </Container>
  )
}






const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
    watchlist: state.trade.watchlist
})

const mapDispatchToProps = {
  getWatchlist: tradeActions.getWatchlistData
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
