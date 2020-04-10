import React from 'react'
import { connect } from 'react-redux'
import { Nav } from 'shards-react'

import Notifications from './Notifications'
import UserActions from './UserActions'

const NavBar = props => {
  const { user, isLoggedIn } = props

  return (
    <Nav navbar className="border-left flex-row">
      {/* <Notifications /> */}
      {isLoggedIn && <UserActions user={user} isLoggedIn={isLoggedIn} />}
    </Nav>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isLoggedIn: state.auth.isLoggedIn,
})

export default connect(mapStateToProps)(NavBar)
