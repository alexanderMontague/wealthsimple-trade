import React from 'react'
import { connect } from 'react-redux'
import { Nav } from 'shards-react'

import SidebarNavItem from './SidebarNavItem'

class SidebarNavItems extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            navItems: this.props.navItems,
        }
    }

    render() {
        const { navItems: items } = this.state
        return (
            <div className="nav-wrapper">
                <Nav className="nav--no-borders flex-column">
                    {items.map((item, idx) => (
                        <SidebarNavItem key={idx} item={item} />
                    ))}
                </Nav>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    navItems: state.userInterface.sidebarRoutes,
})

export default connect(mapStateToProps)(SidebarNavItems)
