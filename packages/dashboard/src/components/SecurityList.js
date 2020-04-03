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

const Security = ({ symbol, name, exchange, price, gain, currency }) => {
  return (
    <>
      <ListGroupItem
        className="d-flex px-3 flex-column security"
        style={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
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
            <div className="pb-1">${price}</div>
            <div className="pb-1">{`${gain.value} (${gain.percent}%) ${currency}`}</div>
          </div>
        </div>
      </ListGroupItem>
      {/* idk why or how tf this works but it does */}
      <div style={{ borderBottom: '0px solid #e1e5eb' }} />
    </>
  )
}

const SecurityList = ({ title, referralData, currentAccount }) => {
  const renderPositions = () => {
    if (!currentAccount?.positions)
      return (
        <div className="pt-5" style={{ textAlign: 'center' }}>
          Select an account!
        </div>
      )

    console.log(currentAccount.positions)

    return currentAccount.positions.map(security => (
      <Security
        key={security.stock.symbol}
        symbol={security.stock.symbol}
        name={security.stock.name}
        exchange={security.stock.primary_exchange}
        price={security.quote.amount}
        gain={{
          value: security.quote.amount - security.quote.previous_close,
          percent: 0.0,
        }}
        currency={security.currency}
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
  /**
   * The referral data.
   */
  referralData: PropTypes.array,
}

SecurityList.defaultProps = {
  title: 'Portfolio',
  referralData: [
    {
      title: 'GitHub',
      value: '19,291',
    },
    {
      title: 'Stack Overflow',
      value: '11,201',
    },
    {
      title: 'Hacker News',
      value: '9,291',
    },
    {
      title: 'Reddit',
      value: '8,281',
    },
    {
      title: 'The Next Web',
      value: '7,128',
    },
    {
      title: 'Tech Crunch',
      value: '6,218',
    },
    {
      title: 'YouTube',
      value: '1,218',
    },
    {
      title: 'Adobe',
      value: '1,171',
    },
    {
      title: 'GitHub',
      value: '19,291',
    },
    {
      title: 'Stack Overflow',
      value: '11,201',
    },
    {
      title: 'Hacker News',
      value: '9,291',
    },
    {
      title: 'Reddit',
      value: '8,281',
    },
    {
      title: 'The Next Web',
      value: '7,128',
    },
    {
      title: 'Tech Crunch',
      value: '6,218',
    },
    {
      title: 'YouTube',
      value: '1,218',
    },
    {
      title: 'Adobe',
      value: '1,171',
    },
  ],
}

export default SecurityList
