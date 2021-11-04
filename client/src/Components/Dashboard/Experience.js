import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { Button, Table } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsTrashFill } from "react-icons/bs";

import { deleteExperience } from "../../actions/profile";

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td>{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
        {exp.to === null ? (
          "Now"
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </td>
      <td>
        <Button color="danger" onClick={() => deleteExperience(exp._id)}>
          <BsTrashFill />
        </Button>
      </td>
    </tr>
  ));
  return (
    <div
      style={{
        marginTop: "5%",
      }}
    >
      <h2>Your Experience</h2>
      <Table hover>
        <thead>
          <tr>
            <th> Company</th>
            <th>Title</th>
            <th>Years</th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </Table>
    </div>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
