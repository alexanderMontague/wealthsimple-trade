import React from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { authActions } from '../../redux/actions'

import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button,
} from 'shards-react'

const UserDetails = ({ title, user }) => {
  const dispatch = useDispatch()
  const logoutUser = () => dispatch(authActions.logoutUser())

  return (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">{title}</h6>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form>
                <Row form>
                  {/* First Name */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feFirstName">First Name</label>
                    <FormInput
                      id="feFirstName"
                      placeholder="First Name"
                      value={user.first_name}
                      disabled
                    />
                  </Col>
                  {/* Last Name */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feLastName">Last Name</label>
                    <FormInput
                      id="feLastName"
                      placeholder="Last Name"
                      value={user.last_name}
                      disabled
                    />
                  </Col>
                </Row>
                <Row form>
                  {/* Email */}
                  <Col md="12" className="form-group">
                    <label htmlFor="feEmail">Email</label>
                    <FormInput
                      type="email"
                      id="feEmail"
                      placeholder="Email Address"
                      value={user.email}
                      autoComplete="email"
                      disabled
                    />
                  </Col>
                </Row>
                <FormGroup>
                  <label htmlFor="feAddress">Address</label>
                  <FormInput
                    id="feAddress"
                    placeholder="Address"
                    value="1234 Main St."
                    disabled
                  />
                </FormGroup>
                <Row form>
                  {/* City */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feCity">City</label>
                    <FormInput id="feCity" placeholder="City" disabled />
                  </Col>
                  {/* State */}
                  <Col md="4" className="form-group">
                    <label htmlFor="feInputState">Province</label>
                    <FormSelect id="feInputState" disabled>
                      <option>Choose...</option>
                      <option>...</option>
                    </FormSelect>
                  </Col>
                  {/* Zip Code */}
                  <Col md="2" className="form-group">
                    <label htmlFor="feZipCode">Postal Code</label>
                    <FormInput id="feZipCode" placeholder="Zip" disabled />
                  </Col>
                </Row>
                <Row form>
                  {/* Description */}
                  <Col md="12" className="form-group">
                    <label htmlFor="feDescription">Description</label>
                    <FormTextarea id="feDescription" rows="5" disabled />
                  </Col>
                </Row>
                <Button
                  theme="accent"
                  className="bg-danger text-center rounded p-3"
                  size="md"
                  onClick={logoutUser}
                >
                  Logout
                </Button>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>
  )
}

UserDetails.propTypes = {
  title: PropTypes.string,
}

UserDetails.defaultProps = {
  title: 'Account Details',
}

export default UserDetails
