import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) return <Redirect to="/dashboard" />;

  return (
    <section class="landing">
      <div class="dark-overlay">
        <div class="landing-inner">
          <h1 class="x-large">Developer Connector</h1>
          <p class="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Button style={{ backgroundColor: "#7b68ee", width: "10rem" }}>
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "white" }}
              >
                Sign Up
              </Link>
            </Button>
            <Button style={{ backgroundColor: "#7b68ee", width: "10rem" }}>
              <Link
                to="/signin"
                style={{ textDecoration: "none", color: "white" }}
              >
                Login
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
