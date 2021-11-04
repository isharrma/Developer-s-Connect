import React from "react";
import PropTypes from "prop-types";
import { BsLinkedin, BsInstagram, BsYoutube, BsWindow } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { username, avatar },
  },
}) => {
  return (
    <div className="profile-top p-2" style={{ backgroundColor: "#bcd4e6" }}>
      <img className="round-img my-1" src={avatar} alt="" />
      <h1 className="large">{username}</h1>
      <p className="lead">
        {status} {company ? <span> at {company}</span> : null}
      </p>
      <p>{location ? <span>{location}</span> : null}</p>
      <div className="icons my-1">
        {website ? (
          <a href={`${website}`} target="_blank" rel="noopener noreferrer">
            <BsWindow />
          </a>
        ) : null}
        {social && social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            <BsLinkedin />
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
            <BsInstagram />
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target="_blank" rel="noopener noreferrer">
            <BsYoutube />
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
