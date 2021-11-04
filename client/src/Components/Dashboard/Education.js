import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { Button, Table } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsTrashFill } from "react-icons/bs";

import { deleteEducation } from "../../actions/profile";

const Education = ({ education, deleteEducation }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.degree}</td>
      <td>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
        {edu.to === null ? (
          "Now"
        ) : (
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        )}
      </td>
      <td>
        <Button color="danger" onClick={() => deleteEducation(edu._id)}>
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
      <h2>Your Education</h2>
      <Table hover>
        <thead>
          <tr>
            <th> School</th>
            <th>Degree</th>
            <th>Years</th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </Table>
    </div>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
