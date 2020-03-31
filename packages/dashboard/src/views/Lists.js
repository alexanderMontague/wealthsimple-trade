import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { tradeActions } from '../redux/actions'


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
  Button,
} from 'shards-react'

import Watchlist from '../components/lists/Watchlist'
import PageTitle from '../components/common/PageTitle'


const Lists = ({
  getWatchlist,
  watchlist,
  user,
  isLoggedIn
}) => {

  useEffect(() => {
    if (isLoggedIn) {
      getWatchlist({tokens: JSON.stringify(user.tokens)})
    }
  }, [isLoggedIn])

  const checkWatchlist = () => {
    console.log(watchlist)
  }

  return (
    <>
     <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
            <PageTitle
                sm="4"
                title="Watchlists"
                className="text-sm-left"
            />
        </Row>
        <button onClick={checkWatchlist}>
          check wl
        </button>
        <Watchlist />
        <Watchlist />
        <Watchlist />

    </Container>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Lists)
