import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  AiFillLike,
  AiOutlineComment,
  AiFillDislike,
  AiFillDelete,
} from "react-icons/ai";

import { addLike, removeLike, deletePost } from "../../actions/post";

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, username, avatar, user, likes, comments, date },
  showActions,
}) => (
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
        Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
      </p>
      {showActions && (
        <Fragment>
          <Button onClick={(e) => addLike(_id)}>
            <AiFillLike /> <span>{likes.length}</span>
          </Button>
          <Button
            type="button"
            class="btn btn-light"
            onClick={(e) => removeLike(_id)}
          >
            <AiFillDislike />{" "}
          </Button>
          <Link
            to={`/post/${_id}`}
            class="btn"
            style={{ backgroundColor: "#7b68ee" }}
          >
            <AiOutlineComment />
            <span class="comment-count">{comments.length}</span>
          </Link>
          {!auth.laoding && user === auth.user._id && (
            <Button color="danger" onClick={(e) => deletePost(_id)}>
              <AiFillDelete />
            </Button>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
