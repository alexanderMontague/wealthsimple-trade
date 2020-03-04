import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/user-profile/UserDetails";
import UserAccountDetails from "../components/user-profile/UserAccountDetails";
import UserLogin from "../components/user-profile/UserLogin";

const UserProfileLite = () => {
  const isLoggedIn = false;

  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="User Profile"
          subtitle="Overview"
          md="12"
          className="ml-sm-auto mr-sm-auto"
        />
      </Row>
      <Row
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Col lg="6">
          <UserDetails />
        </Col>
        <Col lg="6">{isLoggedIn ? <UserAccountDetails /> : <UserLogin />}</Col>
      </Row>
    </Container>
  );
};

export default UserProfileLite;
