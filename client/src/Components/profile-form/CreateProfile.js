import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Badge,
  FormText,
} from "reactstrap";
import { BsLinkedin, BsInstagram, BsYoutube } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";

import { createProfile } from "../../actions/profile";

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    bio: "",
    skills: "",
    status: "",
    githubusername: "",
    linkedin: "",
    instagram: "",
    youtube: "",
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    company,
    website,
    location,
    bio,
    status,
    skills,
    githubusername,
    linkedin,
    instagram,
    youtube,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
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
          <h2 style={{ color: "#cd5700" }}>Create Your Profile</h2>
          <FormText color="muted">Let people know more about you.</FormText>
        </FormGroup>
        <FormGroup style={{ marginTop: "3%" }}>
          <Label for="status">Status</Label>
          <Input
            type="text"
            name="status"
            id="status"
            placeholder="Role of yours in your Company/Institute"
            value={status}
            onChange={(e) => onChange(e)}
          />
          <FormText color="muted">Select your role in the company.</FormText>
        </FormGroup>
        <FormGroup style={{ marginTop: "2%" }}>
          <Label for="comapny">Company</Label>
          <Input
            type="text"
            name="company"
            id="comany"
            placeholder="Company/Institute name"
            value={company}
            onChange={(e) => onChange(e)}
          />
        </FormGroup>
        <FormGroup style={{ marginTop: "2%" }}>
          <Label for="Location">Location</Label>
          <Input
            type="text"
            name="location"
            id="location"
            placeholder="City,Sate E.g(Boston,MA)"
            value={location}
            onChange={(e) => onChange(e)}
          />
        </FormGroup>
        <FormGroup style={{ marginTop: "2%" }}>
          <Label for="website">Website</Label>
          <Input
            type="url"
            name="website"
            id="website"
            placeholder="website"
            value={website}
            onChange={(e) => onChange(e)}
          />
        </FormGroup>
        <FormGroup style={{ marginTop: "2%" }}>
          <Label for="skills">Skills*</Label>
          <Input
            type="text"
            name="skills"
            id="skills"
            placeholder="Skills with comma seperated(E.g, Java,JS,Express)"
            value={skills}
            onChange={(e) => onChange(e)}
          />
        </FormGroup>
        <FormGroup style={{ marginTop: "2%" }}>
          <Label for="githubusername">Github Username</Label>
          <Input
            type="text"
            name="githubusername"
            id="githubusername"
            placeholder="Github username"
            value={githubusername}
            onChange={(e) => onChange(e)}
          />
        </FormGroup>
        <FormGroup style={{ marginTop: "2%" }}>
          <Label for="bio">Bio</Label>
          <Input
            type="textarea"
            name="bio"
            id="bio"
            placeholder="Describe yourself in few words"
            value={bio}
            onChange={(e) => onChange(e)}
          />
        </FormGroup>
        <FormGroup style={{ marginTop: "2%" }}>
          <Label check>
            <Input
              type="checkbox"
              onChange={() => toggleSocialInputs(!displaySocialInputs)}
            />
            Add Social Networks
          </Label>
          <Badge color="primary">Optional</Badge>
        </FormGroup>
        {displaySocialInputs && (
          <Fragment>
            <FormGroup row style={{ marginTop: "2%" }}>
              <Label for="linkedin" sm={1} style={{ marginLeft: "5%" }}>
                <BsLinkedin size={30} />
              </Label>
              <Col sm={6}>
                <Input
                  type="text"
                  name="linkedin"
                  id="linkedin"
                  placeholder="Linkedin link"
                  value={linkedin}
                  onChange={(e) => onChange(e)}
                />
              </Col>
            </FormGroup>
            <FormGroup row style={{ marginTop: "2%" }}>
              <Label for="instagram" sm={1} style={{ marginLeft: "5%" }}>
                <BsInstagram size={30} />
              </Label>
              <Col sm={6}>
                <Input
                  type="text"
                  name="instagram"
                  id="instagram"
                  placeholder="Instagram link"
                  value={instagram}
                  onChange={(e) => onChange(e)}
                />
              </Col>
            </FormGroup>
            <FormGroup row style={{ marginTop: "2%" }}>
              <Label for="youtube" sm={1} style={{ marginLeft: "5%" }}>
                <BsYoutube size={30} />
              </Label>
              <Col sm={6}>
                <Input
                  type="text"
                  name="youtube"
                  id="youtube"
                  placeholder="Youtube link"
                  value={youtube}
                  onChange={(e) => onChange(e)}
                />
              </Col>
            </FormGroup>
          </Fragment>
        )}
        <Button
          color="primary"
          style={{
            width: "10%",
            marginTop: "2%",
            marginLeft: "45%",
            marginBottom: "2%",
          }}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
