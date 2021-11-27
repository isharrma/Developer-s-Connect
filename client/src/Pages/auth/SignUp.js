import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-dom";
import {
  Container,
  Col,
  Row,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  FormGroup,
  Button,
  Label,
  Input,
} from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

//* ----------------------MAIN FUNCTION ------------------------------
const SignUp = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { username, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setAlert("Passwords do not match", "danger");

      toast.error("Passwords do not match", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      register({ username, email, password });
    }
  };

  // Redirect if logged in
  if (isAuthenticated) return <Redirect to="/dashboard" />;

  return (
    <Container className="text-center">
      <ToastContainer />
      <Row>
        <Col lg={6} className="offset-lg-3 mt-5">
          <Card>
            <Form onSubmit={(e) => onSubmit(e)}>
              <CardHeader className="">SignUp </CardHeader>
              <CardBody>
                <FormGroup row>
                  <Label for="username" sm={3}>
                    Username
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="username"
                      name="username"
                      id="username"
                      placeholder="johndoe"
                      value={username}
                      onChange={(e) => onChange(e)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row className="mt-3">
                  <Label for="email" sm={3}>
                    Email
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="johndoe@xyz.com"
                      value={email}
                      onChange={(e) => onChange(e)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row className="mt-3">
                  <Label for="password" sm={3}>
                    Password
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="password"
                      value={password}
                      onChange={(e) => onChange(e)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row className="mt-3">
                  <Label for="password2" sm={3}>
                    Confirm Password
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="password"
                      name="password2"
                      id="password2"
                      placeholder="confirm your password"
                      value={password2}
                      onChange={(e) => onChange(e)}
                    />
                  </Col>
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button
                  type="submit"
                  block
                  style={{ backgroundColor: "#7b68ee" }}
                >
                  Sign Up
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

SignUp.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(SignUp);
//connect takes two parametes : 1 - state that you wanna map
// 2- the action you want to perform
