import React, { useState } from "react";
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
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { login } from "../../actions/auth";

//* ----------------MAIN FUNCTION ------------------------
const SignIn = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) return <Redirect to="/dashboard" />;

  return (
    <Container className="text-center">
      <Row>
        <Col lg={6} className="offset-lg-3 mt-5">
          <Card>
            <Form onSubmit={(e) => onSubmit(e)}>
              <CardHeader className="">SignIn </CardHeader>
              <CardBody>
                <FormGroup row>
                  <Label for="email" sm={3}>
                    Email
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="xyz@xyz.com"
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
              </CardBody>
              <CardFooter>
                <Button
                  type="submit"
                  block
                  style={{ backgroundColor: "#7b68ee" }}
                >
                  Sign In
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

login.PropTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(SignIn);
