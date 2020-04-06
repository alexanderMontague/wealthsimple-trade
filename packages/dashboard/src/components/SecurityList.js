import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  CardFooter,
  Row,
  Col,
  FormSelect,
} from 'shards-react'
import '../../src/assets/styles.css'

const gainStyles = {
  green: '#17c671',
  red: '#c4183c',
}

const Security = ({
  symbol,
  name,
  exchange,
  price,
  gain,
  currency,
  id,
  selectSecurity,
  selectedSecurity,
}) => {
  return (
    <>
      <ListGroupItem
        className={`d-flex px-3 flex-column security`}
        style={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          background: selectedSecurity?.id === id ? '#e1e5eb' : null,
        }}
        onClick={() => selectSecurity({ id, symbol, name, exchange, currency })}
      >
        <div>
          <div style={{ fontSize: 20 }}>
            <b>{symbol}</b>
          </div>
        </div>
        <div className="d-flex">
          <div className="w-100">
            <div className="pb-1">{name}</div>
            <div className="pb-1">
              <i>{exchange}</i>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-center w-100">
            <div className="pb-1">${Math.round(price * 100) / 100}</div>
            <div className="pb-1">
              <span
                style={{
                  color: gain.value < 0 ? gainStyles.red : gainStyles.green,
                }}
              >{`${Math.round(gain.value * 100) / 100} (${Math.round(
                gain.percent * 100
              ) / 100}%)`}</span>{' '}
              {currency}
            </div>
          </div>
        </div>
      </ListGroupItem>
      {/* idk why or how tf this works but it does */}
      <div style={{ borderBottom: '0px solid #e1e5eb' }} />
    </>
  )
}

const SecurityList = ({
  title,
  currentAccount,
  selectSecurity,
  selectedSecurity,
}) => {
  const renderPositions = () => {
    if (!currentAccount?.positions)
      // todo: show when accounts have no holdings too
      return (
        <div className="pt-5" style={{ textAlign: 'center' }}>
          Select an account!
        </div>
      )

    return currentAccount.positions.map(security => (
      <Security
        id={security.id}
        selectSecurity={selectSecurity}
        key={security.id}
        symbol={security.stock.symbol}
        name={security.stock.name}
        exchange={security.stock.primary_exchange}
        price={security.quote.amount}
        gain={{
          value: security.quote.amount - security.quote.previous_close,
          percent: security.quote.amount / security.quote.previous_close - 1,
        }}
        currency={security.currency}
        selectedSecurity={selectedSecurity}
      />
    ))
  }

  return (
    <Card small className="h-100">
      <CardHeader className="border-bottom">
        <h6 className="m-0">{title}</h6>
        <div className="block-handle" />
      </CardHeader>

      <CardBody
        className="p-0"
        style={{ minHeight: 400, maxHeight: 600, overflow: 'scroll' }}
      >
        <ListGroup small flush className="list-group-small">
          {renderPositions()}
        </ListGroup>
      </CardBody>

      <CardFooter className="border-top" />
    </Card>
  )
}

SecurityList.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
}

SecurityList.defaultProps = {
  title: 'Portfolio',
}

export default SecurityList
