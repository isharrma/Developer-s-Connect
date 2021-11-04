import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { getProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem";
import Spinner from "../Layout/Spinner";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <div
      style={{
        position: "absolute",
        left: "10%",
        right: "10%",
      }}
    >
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <Row>
            <h2 style={{ color: "#f77f00", marginTop: "3%" }}>Developers</h2>
          </Row>
          <Row>
            <h4>Browse and connect with other developers</h4>
          </Row>
          <div style={{ marginTop: "4%" }}>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile.id} profile={profile} />
              ))
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
