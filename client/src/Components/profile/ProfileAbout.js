import PropTypes from "prop-types";
import { Fragment } from "react";
import { BsCodeSlash } from "react-icons/bs";

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { username },
  },
}) => {
  return (
    <div className="profile-about bg-light p-2">
      {bio && (
        <Fragment>
          <h2 style={{ color: "#f77f00" }}>Bio</h2>
          <p>{bio}</p>
        </Fragment>
      )}
      <hr style={{ height: 3, marginRight: "20", marginLeft: "20%" }} />
      <h2 style={{ color: "#f77f00" }}>Skill Set</h2>
      <div className="skills">
        {skills.map((skill, index) => (
          <div key={index} style={{ marginLeft: "2%", marginTop: "1%" }}>
            <BsCodeSlash /> {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
