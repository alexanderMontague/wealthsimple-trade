import React from 'react'
import PropTypes from 'prop-types'
import {
    Card,
    CardHeader,
    Button,
    ListGroup,
    ListGroupItem,
    Progress,
} from 'shards-react'

const InfoSidebar = ({ userInfo }) => (
    <Card small className="mb-4 pt-3 h-100">
        <CardHeader className="border-bottom text-center">
            <h4 className="mb-0">{userInfo.title}</h4>
            <span className="text-muted d-block mb-2">{userInfo.subTitle}</span>
        </CardHeader>
        <ListGroup flush>
            <ListGroupItem className="p-4">
                <strong className="text-muted d-block mb-2">
                    {userInfo.preconditions}
                </strong>
                <span>{userInfo.preconditionsValue}</span>
            </ListGroupItem>
            <ListGroupItem className="p-4">
                <strong className="text-muted d-block mb-2">
                    {userInfo.whatThisDoes}
                </strong>
                <span>{userInfo.whatThisDoesValue}</span>
            </ListGroupItem>
            <ListGroupItem className="p-4">
                <strong className="text-muted d-block mb-2">
                    {userInfo.auth}
                </strong>
                <span>{userInfo.authValue}</span>
            </ListGroupItem>
        </ListGroup>
    </Card>
)

InfoSidebar.propTypes = {
    /**
     * The user details object.
     */
    InfoSidebar: PropTypes.object,
}

InfoSidebar.defaultProps = {
    userInfo: {
        title: 'How this Works',
        subTitle: 'Wealthsimple Trade Desktop Client',
        preconditions: 'Preconditions',
        preconditionsValue:
            'Make sure you have signed up for a Wealthsimple Trade Account on your mobile device through the app! We are in no way affiliated with Wealthsimple and cannot create accounts for you. Once you have an account you can utilize this desktop app.',
        whatThisDoes: 'About',
        whatThisDoesValue:
            "This is a desktop client for viewing and managing your Wealthsimple Trade Account! If you don't love viewing things (especially investments) on your phone, use this instead. Again, we are not Wealthsimple. This is unaffiliated. We ONLY store your email if you wish to set up alerts. Feel free to check out the source at <GITHUB>.",
        auth: 'Logging In',
        authValue:
            'There is no registration here. Log in with the same Wealthsimple Trade Email and Password you use for your mobile application. We utilize your existing account and store nothing unless you want us to. Enjoy the tool!',
    },
}

export default InfoSidebar
