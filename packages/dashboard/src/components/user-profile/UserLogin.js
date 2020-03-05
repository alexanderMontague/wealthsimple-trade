import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { authActions } from '../../redux/actions'

import {
    Card,
    CardHeader,
    Row,
    Col,
    Form,
    FormInput,
    Button,
    FormFeedback,
} from 'shards-react'
import { SyncLoader } from 'react-spinners'

const UserAccountDetails = ({
    title,
    loginUser,
    isLoginError,
    loginMessage,
    isLoginLoading,
}) => {
    const [userInfo, setUserInfo] = useState({ email: '', password: '' })
    const [validation, setValidation] = useState({
        email: {
            invalid: false,
            message: '',
        },
        password: {
            invalid: false,
            message: '',
        },
    })

    const isInvalid = () => {
        if (userInfo.email.length === 0) {
            setValidation({
                ...validation,
                email: { invalid: true, message: 'Email is Required' },
            })
            return true
        } else if (
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                userInfo.email
            ) === false
        ) {
            setValidation({
                ...validation,
                email: { invalid: true, message: 'Email is Invalid' },
            })
            return true
        } else if (userInfo.password.length === 0) {
            setValidation({
                ...validation,
                password: { invalid: true, message: 'Password is Required' },
            })
            return true
        }

        setValidation({
            email: { invalid: false, message: '' },
            password: { invalid: false, message: '' },
        })
    }

    const loginHandler = event => {
        event.preventDefault()

        if (isInvalid()) return

        loginUser(userInfo)
    }

    return (
        <Card small className="mb-4 h-100">
            <CardHeader className="border-bottom">
                <h4 className="m-0">{title}</h4>
            </CardHeader>
            <Row className="my-1 text-center">
                <Col md="12" className="form-group">
                    <h6 style={{ color: isLoginError ? 'red' : '#3d5170' }}>
                        {loginMessage}
                    </h6>
                </Col>
            </Row>
            <Form className="p-3 h-100" onSubmit={loginHandler}>
                <Row className="my-4">
                    {/* Email */}
                    <Col md="12" className="form-group">
                        <label htmlFor="feEmail">Email</label>
                        <FormInput
                            type="email"
                            id="feEmail"
                            placeholder="Email Address"
                            value={userInfo.email}
                            autoComplete="email"
                            required
                            invalid={validation.email.invalid}
                            onChange={e =>
                                setUserInfo({
                                    ...userInfo,
                                    email: e.target.value,
                                })
                            }
                        />
                        <FormFeedback>{validation.email.message}</FormFeedback>
                    </Col>
                </Row>

                <Row form className="my-4">
                    {/* Password */}
                    <Col md="12" className="form-group">
                        <label htmlFor="fePassword">Password</label>
                        <FormInput
                            type="password"
                            id="fePassword"
                            placeholder="Password"
                            value={userInfo.password}
                            autoComplete="current-password"
                            required
                            invalid={validation.password.invalid}
                            onChange={e =>
                                setUserInfo({
                                    ...userInfo,
                                    password: e.target.value,
                                })
                            }
                        />
                        <FormFeedback>
                            {validation.password.message}
                        </FormFeedback>
                    </Col>
                </Row>

                {isLoginLoading ? (
                    <SyncLoader size={20} color={'#007bff'} />
                ) : (
                    <Button
                        theme="accent"
                        className="text-center rounded p-3 w-25 my-4"
                        size="md"
                        type="submit"
                    >
                        Login
                    </Button>
                )}
            </Form>
        </Card>
    )
}

UserAccountDetails.propTypes = {
    title: PropTypes.string,
}

UserAccountDetails.defaultProps = {
    title: 'Login',
}

const mapStateToProps = state => ({
    isLoginError: state.auth.isLoginError,
    isLoginLoading: state.auth.isLoginLoading,
    loginMessage: state.auth.loginMessage,
})

const mapDispatchToProps = {
    loginUser: authActions.loginUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAccountDetails)
