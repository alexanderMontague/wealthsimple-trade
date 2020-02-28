import React from "react";


class NavbarToggle extends React.Component {

  render() {
    return (
      <nav className="nav">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#" className="nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-inline d-lg-none text-center">
          <i className="material-icons">&#xE5D2;</i>
        </a>
      </nav>
    )
  }
}

export default NavbarToggle;
