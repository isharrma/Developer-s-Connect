import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Badge,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { addExperience } from "../../actions/profile";

//*--------------------MAIN FUNCTION------------------------
const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    desc: "",
  });

  const [toDateDisabled, toggleToDateDisabled] = useState(false);

  const { company, title, location, from, to, current, desc } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    addExperience(formData, history);
  };
  return (
    <div
      style={{
        position: "absolute",
        left: "10%",
        right: "10%",
        top: "20%",
      }}
    >
      <Form onSubmit={(e) => onSubmit(e)}>
        <FormGroup>
          <h2 style={{ color: "#cd5700" }}>Add an Experience</h2>
          <FormText color="muted">
            Share your developing/programming position you've had.
          </FormText>
        </FormGroup>
        <FormGroup style={{ marginTop: "3%" }}>
          <Label for="title">Title*</Label>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="Job Title(E.g, Java developer,e.tc)"
            value={title}
            onChange={(e) => onChange(e)}
          />
        </FormGroup>
        <FormGroup style={{ marginTop: "3%" }}>
          <Label for="company">Company*</Label>
          <Input
            type="text"
            name="company"
            id="company"
            placeholder="Company you worked for"
            value={company}
            onChange={(e) => onChange(e)}
          />
        </FormGroup>
        <FormGroup style={{ marginTop: "3%" }}>
          <Label for="location">Location</Label>
          <Input
            type="text"
            name="location"
            id="location"
            placeholder="Location of your office/institute"
            value={location}
            onChange={(e) => onChange(e)}
          />
        </FormGroup>
        <FormGroup style={{ marginTop: "3%" }}>
          <Label for="from">Date</Label>
          <Input
            type="date"
            name="from"
            id="from"
            placeholder="date placeholder"
            value={from}
            onChange={(e) => onChange(e)}
          />
        </FormGroup>
        <FormGroup style={{ marginTop: "3%" }}>
          <Label check>
            <Input
              type="checkbox"
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toggleToDateDisabled(!toDateDisabled);
              }}
            />
            <Badge color="primary">Current Job</Badge>
          </Label>
        </FormGroup>
        {!toDateDisabled && (
          <FormGroup style={{ marginTop: "3%" }}>
            <Label for="from">To</Label>
            <Input
              type="date"
              name="to"
              id="to"
              placeholder="date placeholder"
              value={to}
              onChange={(e) => onChange(e)}
            />
          </FormGroup>
        )}
        <FormGroup style={{ marginTop: "3%" }}>
          <Label for="desc">Description</Label>
          <Input
            type="textarea"
            name="desc"
            id="desc"
            value={desc}
            onChange={(e) => onChange(e)}
          />
          <FormText color="muted">Describe your role in brief.</FormText>
        </FormGroup>
        <Button
          style={{
            width: "10%",
            marginTop: "2%",
            marginLeft: "45%",
            marginBottom: "2%",
            backgroundColor: "#7b68ee",
          }}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
