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

import List from '../components/lists/List'
import PageTitle from '../components/common/PageTitle'

const Watchlists = ({ getWatchlist, watchlist, user, isLoggedIn }) => {
  useEffect(() => {
    if (isLoggedIn) {
      getWatchlist({ tokens: JSON.stringify(user.tokens) })
    }
  }, [isLoggedIn])

  const renderList = () => {
    return watchlist.securities ? (
      <List listTitle={'WST Watchlist'} items={watchlist.securities} />
    ) : (
      <h2 style={{ margin: 'auto' }}>Loading Watchlist Data...</h2>
    )
  }

  const list = renderList()

  return (
    <>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Watchlists" className="text-sm-left" />
        </Row>

        <Row>{list}</Row>
      </Container>
    </>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
  watchlist: state.trade.watchlist,
})

const mapDispatchToProps = {
  getWatchlist: tradeActions.getWatchlistData,
}

export default connect(mapStateToProps, mapDispatchToProps)(Watchlists)
