import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import Spinner from "../Layout/Spinner";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { loading, profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Container fluid>
      <Row sm={7}>
        <Col>
          <h1>Dashboard</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4> Welcome {user.username}</h4>
        </Col>
      </Row>
      {profile !== null ? (
        <Fragment>
          <Row>
            <DashboardActions />
          </Row>
          <Row>
            <Experience experience={profile.experience} />
          </Row>
          <Row>
            <Education education={profile.education} />
          </Row>
          <Row style={{ marginTop: "2%" }}>
            <Col sm={{ size: "auto", offset: 10 }}>
              <Button color="danger" onClick={() => deleteAccount()}>
                Delete Account
              </Button>
            </Col>
          </Row>
        </Fragment>
      ) : (
        <Container>
          <Row>
            <Col>
              <h4>You don't have a profile yet</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to="/create-profile">
                <Button className="priamry"> Create</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
