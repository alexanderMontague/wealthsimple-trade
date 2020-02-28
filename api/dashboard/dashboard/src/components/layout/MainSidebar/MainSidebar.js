import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Col } from "shards-react";

import SidebarMainNavbar from "./SidebarMainNavbar";
import SidebarSearch from "./SidebarSearch";
import SidebarNavItems from "./SidebarNavItems";

const MainSidebar = props => {
  const { menuVisible } = props;

  const classes = classNames(
    "main-sidebar",
    "px-0",
    "col-12",
    menuVisible && "open"
  );

  return (
    <Col tag="aside" className={classes} lg={{ size: 2 }} md={{ size: 3 }}>
      <SidebarMainNavbar hideLogoText={props.hideLogoText} />
      <SidebarSearch />
      <SidebarNavItems />
    </Col>
  );
};

MainSidebar.propTypes = {
  /**
   * Whether to hide the logo text, or not.
   */
  hideLogoText: PropTypes.bool
};

MainSidebar.defaultProps = {
  hideLogoText: false
};

const mapStateToProps = state => ({
  menuVisible: state.userInterface.sidebarVisible
});

export default connect(mapStateToProps)(MainSidebar);
