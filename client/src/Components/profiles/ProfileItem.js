import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { BsCodeSlash } from "react-icons/bs";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <div className="profile bg-light">
      <img src={avatar} alt="" className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`}>
          <Button style={{ backgroundColor: "#7b68ee" }}>View Profile</Button>
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} style={{ color: "#f77f00" }}>
            <BsCodeSlash /> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;