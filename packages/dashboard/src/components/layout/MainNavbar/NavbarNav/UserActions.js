import React from 'react'
import { Link } from 'react-router-dom'
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Collapse,
    NavItem,
    NavLink,
} from 'shards-react'

import avatar from '../../../../images/avatars/user.png'

export default class UserActions extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: false,
        }

        this.toggleUserActions = this.toggleUserActions.bind(this)
    }

    toggleUserActions() {
        this.setState({
            visible: !this.state.visible,
        })
    }

    render() {
        const { user, isLoggedIn } = this.props

        console.log('logged in', isLoggedIn)

        return (
            <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
                <DropdownToggle
                    caret
                    tag={NavLink}
                    className="text-nowrap px-3"
                >
                    <img
                        className="user-avatar rounded-circle mr-2"
                        src={avatar}
                        alt="User Avatar"
                    />
                    <span className="d-none d-md-inline-block">{`${user.first_name} ${user.last_name}`}</span>
                </DropdownToggle>
                <Collapse
                    tag={DropdownMenu}
                    right
                    small
                    open={this.state.visible}
                >
                    <DropdownItem tag={Link} to="user-profile">
                        <i className="material-icons">&#xE7FD;</i> Profile
                    </DropdownItem>
                    <DropdownItem divider />

                    {isLoggedIn && (
                        <DropdownItem tag={Link} to="/" className="text-danger">
                            <i className="material-icons text-danger">
                                &#xE879;
                            </i>{' '}
                            Logout
                        </DropdownItem>
                    )}
                </Collapse>
            </NavItem>
        )
    }
}
