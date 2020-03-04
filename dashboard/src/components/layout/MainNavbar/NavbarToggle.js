import React from 'react'
import { connect } from 'react-redux'

import { interfaceActions } from '../../../redux/actions'

const NavbarToggle = props => {
    return (
        <nav className="nav">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
                href="#"
                onClick={props.toggleSidebar}
                className="nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-inline d-lg-none text-center"
            >
                <i className="material-icons">&#xE5D2;</i>
            </a>
        </nav>
    )
}

const mapDispatchToProps = {
    toggleSidebar: interfaceActions.toggleSidebar,
}

export default connect(null, mapDispatchToProps)(NavbarToggle)
