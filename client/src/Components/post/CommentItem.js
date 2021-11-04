import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { AiFillDelete } from "react-icons/ai";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { deleteComment } from "../../actions/post";

const CommentItem = ({
  postId,
  deleteComment,
  auth,
  comment: { _id, text, username, avatar, user, date },
}) => {
  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img class="round-img" src={avatar} alt="" />
          <h4>{username}</h4>
        </Link>
      </div>
      <div>
        <p class="my-1">{text}</p>
        <p class="post-date">
          <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {!auth.loaing && user === auth.user._id && (
          <Button color="danger" onClick={(e) => deleteComment(postId, _id)}>
            <AiFillDelete />
          </Button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { deleteComment })(CommentItem);
