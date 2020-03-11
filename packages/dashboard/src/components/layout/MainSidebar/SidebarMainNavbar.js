import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Navbar, NavbarBrand } from 'shards-react'
import { interfaceActions } from '../../../redux/actions'

import logo from '../../../images/wst-logo.png'

class SidebarMainNavbar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { hideLogoText } = this.props
    return (
      <div className="main-navbar">
        <Navbar
          className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0"
          type="light"
        >
          <NavbarBrand
            className="w-100 mr-0"
            href="/holdings"
            style={{ lineHeight: '40px' }}
          >
            <div className="d-table m-auto">
              <img
                id="main-logo"
                className="d-inline-block align-top mr-1"
                style={{ width: '40px', height: '40px' }}
                src={logo}
                alt="Wealthsimple Trade Desktop Client"
              />
              {!hideLogoText && (
                <span className="d-none d-md-inline ml-1">
                  WST Desktop Client
                </span>
              )}
            </div>
          </NavbarBrand>
          {/* eslint-disable-next-line */}
          <a
            className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
            onClick={this.props.toggleSidebar}
          >
            <i className="material-icons">&#xE5C4;</i>
          </a>
        </Navbar>
      </div>
    )
  }
}

SidebarMainNavbar.propTypes = {
  /**
   * Whether to hide the logo text, or not.
   */
  hideLogoText: PropTypes.bool,
}

SidebarMainNavbar.defaultProps = {
  hideLogoText: false,
}

const mapDispatchToProps = {
  toggleSidebar: interfaceActions.toggleSidebar,
}

export default connect(null, mapDispatchToProps)(SidebarMainNavbar)
