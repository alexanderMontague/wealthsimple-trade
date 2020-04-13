import React from 'react'
import { connect } from 'react-redux'
import { Nav } from 'shards-react'
import { ClipLoader } from 'react-spinners'

import UserActions from './UserActions'

const NavBar = props => {
  const { user, isLoggedIn, isStatusLoading } = props

  return (
    <Nav navbar className="border-left flex-row">
      {/* <Notifications /> */}
      {isStatusLoading && (
        <ClipLoader loading={isStatusLoading} size={50} color="#007bff" />
      )}
      {isLoggedIn && <UserActions user={user} isLoggedIn={isLoggedIn} />}
    </Nav>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isLoggedIn: state.auth.isLoggedIn,
  isStatusLoading: state.auth.isStatusLoading,
})

export default connect(mapStateToProps)(NavBar)
