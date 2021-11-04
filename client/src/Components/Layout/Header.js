import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarToggler,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { logout } from "../../actions/auth";

//* ----------------------MAIN FUNCTION------------------------------
const Header = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand>
        <Link to="/" className="text-white" style={{ textDecoration: "none" }}>
          Dev's Connect
        </Link>
      </NavbarBrand>

      {/* This is for the collapse form when the screen is shrinked. */}
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        {!loading && (
          <Nav className="ms-auto" navbar>
            {!isAuthenticated ? (
              <>
                <NavItem>
                  <Link
                    to="/profiles"
                    className="text-white"
                    style={{ textDecoration: "none", padding: "10px" }}
                  >
                    Developers
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    to="/signup"
                    className="text-white"
                    style={{
                      textDecoration: "none",
                      padding: "10px",
                    }}
                  >
                    Sign Up
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    to="/signin"
                    className="text-white"
                    style={{ textDecoration: "none", padding: "10px" }}
                  >
                    Sign In
                  </Link>
                </NavItem>
              </>
            ) : (
              <NavItem>
                <Link
                  to="/dashboard"
                  className="text-white"
                  style={{ textDecoration: "none", padding: "10px" }}
                >
                  Dashboard
                </Link>
                <Link
                  to="/posts"
                  className="text-white"
                  style={{ textDecoration: "none", padding: "10px" }}
                >
                  Posts
                </Link>
                <Link
                  to="/profiles"
                  className="text-white"
                  style={{ textDecoration: "none", padding: "10px" }}
                >
                  Developers
                </Link>
                <Link
                  to="/"
                  className="text-white"
                  style={{ textDecoration: "none", padding: "10px" }}
                  onClick={logout}
                >
                  Logout
                </Link>
              </NavItem>
            )}
          </Nav>
        )}
      </Collapse>
    </Navbar>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
