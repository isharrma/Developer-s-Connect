import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
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

import { addEducation } from "../../actions/profile";

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    desc: "",
  });

  const [toDateDisabled, toggleToDateDisabled] = useState(false);

  const { school, degree, fieldofstudy, from, to, current, desc } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    addEducation(formData, history);
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
          <h2 style={{ color: "#cd5700" }}>Add an Education</h2>
          <FormText color="muted">
            Share your education/certification yo;ve done.
          </FormText>
        </FormGroup>
        <FormGroup style={{ marginTop: "3%" }}>
          <Label for="school">School*</Label>
          <Input
            type="text"
            name="school"
            id="school"
            placeholder="School/Institute Name"
            value={school}
            onChange={(e) => onChange(e)}
          />
        </FormGroup>
        <FormGroup style={{ marginTop: "3%" }}>
          <Label for="degree">Degree*</Label>
          <Input
            type="text"
            name="degree"
            id="degree"
            placeholder="Degree you pursued"
            value={degree}
            onChange={(e) => onChange(e)}
          />
        </FormGroup>
        <FormGroup style={{ marginTop: "3%" }}>
          <Label for="fieldofstudy">Field of Study</Label>
          <Input
            type="text"
            name="fieldofstudy"
            id="fieldofstudy"
            placeholder="Enter your major/subjects"
            value={fieldofstudy}
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
            <Badge color="primary">Still Doing</Badge>
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
          <FormText color="muted">Describe what you learned in brief.</FormText>
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
