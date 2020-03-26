import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Nav, NavItem, NavLink } from 'shards-react'
import { Link } from 'react-router-dom'

const MainFooter = ({ contained, menuItems, copyright }) => (
  <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
    <Container fluid={contained}>
      <Row>
        <Nav>
          {menuItems.map((item, idx) => (
            <NavItem key={idx}>
              <NavLink
                tag={Link}
                to={
                  item.title === 'Wealthsimple'
                    ? window.location.pathname
                    : item.to
                }
                onClick={
                  item.title === 'Wealthsimple'
                    ? () =>
                        window.open(
                          'https://www.wealthsimple.com/en-ca/',
                          '_blank'
                        )
                    : () => {}
                }
              >
                {item.title}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <span className="copyright ml-auto my-auto mr-2">{copyright}</span>
      </Row>
    </Container>
  </footer>
)

MainFooter.propTypes = {
  /**
   * Whether the content is contained, or not.
   */
  contained: PropTypes.bool,
  /**
   * The menu items array.
   */
  menuItems: PropTypes.array,
  /**
   * The copyright info.
   */
  copyright: PropTypes.string,
}

MainFooter.defaultProps = {
  contained: false,
  copyright:
    'All assets, information and accounts owned by Wealthsimple Technologies Inc.',
  menuItems: [
    {
      title: 'Wealthsimple',
      to: 'https://www.wealthsimple.com/en-ca/',
    },
    {
      title: 'Holdings',
      to: '/holdings',
    },
    {
      title: 'Trade',
      to: '/trade',
    },
    {
      title: 'Watchlist',
      to: '/watchlist',
    },
    {
      title: 'Profile',
      to: 'user-profile',
    },
  ],
}

export default MainFooter
