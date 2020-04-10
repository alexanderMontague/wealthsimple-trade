import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Container, Navbar, Row, Col } from 'shards-react'

import { tradeActions } from '../../../redux/actions'
import { searchSecurity } from '../../../utils/requests'

import NavbarSearch from './NavbarSearch'
import NavbarNav from './NavbarNav/NavbarNav'
import NavbarToggle from './NavbarToggle'

const DropDownItem = ({
  name,
  symbol,
  exchange,
  id,
  currency,
  selectSecurity,
}) => {
  return (
    <div
      className="securityDropDownItem"
      onClick={() => selectSecurity({ id, name, symbol, exchange, currency })}
    >
      <Row>
        <Col className="col-9">{`${name} (${symbol})`}</Col>
        <Col className="col-3">
          <i>{exchange}</i>
        </Col>
      </Row>
    </div>
  )
}

const MainNavbar = ({ layout, stickyTop, history }) => {
  const classes = classNames(
    'main-navbar',
    'bg-white',
    stickyTop && 'sticky-top'
  )

  const [searchSecurityError, setSearchSecurityError] = useState('')
  const [securityResults, setSecurityResults] = useState([])
  const [isSearchLoading, setIsSearchLoading] = useState(false)

  const dispatch = useDispatch()

  const tokens = useSelector(state => state.auth.user.tokens)

  let searchTimer

  const onSearch = e => {
    clearTimeout(searchTimer)
    setSearchSecurityError('')

    const query = e.target.value
    let queryResponse

    // search after user has stopped typing query for 1s
    searchTimer = setTimeout(async () => {
      if (!query) {
        setIsSearchLoading(false)
        return setSecurityResults([])
      }

      setIsSearchLoading(true)

      try {
        queryResponse = (
          await searchSecurity({
            tokens: JSON.stringify(tokens),
            query,
          })
        ).data.results
      } catch (error) {
        setSearchSecurityError(error.response?.data?.message)
      }

      setSecurityResults(queryResponse || [])
      setIsSearchLoading(false)
    }, 1000)
  }

  const onDropDownSecurityClick = security => {
    setSecurityResults([])

    dispatch(tradeActions.selectSecurity(security))

    history.push('/trade')
  }

  const renderSecurityResults = () =>
    securityResults.map(security => (
      <DropDownItem
        name={security.stock.name}
        symbol={security.stock.symbol}
        key={security.id}
        exchange={security.stock.primary_exchange}
        id={security.id}
        currency={security.currency}
        selectSecurity={onDropDownSecurityClick}
      />
    ))

  return (
    <>
      <div className={classes}>
        <Container className="p-0 m-0 mr-0" style={{ maxWidth: 1600 }}>
          <Navbar
            type="light"
            className="align-items-stretch flex-md-nowrap p-0 justify-content-end"
            style={{ borderBottom: '1px solid #ced4da' }}
          >
            <NavbarSearch onSearch={onSearch} loading={isSearchLoading} />
            <NavbarNav />
            <NavbarToggle />
          </Navbar>
        </Container>
        <div className="securityDropDownContainer">
          <div style={{ fontSize: 10, color: 'red' }}>
            {searchSecurityError}
          </div>
          {renderSecurityResults()}
        </div>
      </div>
    </>
  )
}

MainNavbar.propTypes = {
  /**
   * The layout type where the MainNavbar is used.
   */
  layout: PropTypes.string,
  /**
   * Whether the main navbar is sticky to the top, or not.
   */
  stickyTop: PropTypes.bool,
}

MainNavbar.defaultProps = {
  stickyTop: true,
}

export default withRouter(MainNavbar)
