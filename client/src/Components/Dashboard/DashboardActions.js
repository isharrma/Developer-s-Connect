import React from "react";
import { Link } from "react-router-dom";
import { Button, ButtonGroup } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const DashboardActions = () => {
  return (
    <ButtonGroup>
      <Link to="/edit-profile">
        <Button type="primary">Edit Profile</Button>
      </Link>
      <Link to="/add-experience">
        <Button type="primary">Add Experience</Button>
      </Link>
      <Link to="/add-education">
        <Button type="primary">Add Education</Button>
      </Link>
    </ButtonGroup>
  );
};

export default DashboardActions;
