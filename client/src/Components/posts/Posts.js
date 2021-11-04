import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Spinner from "../Layout/Spinner";
import { getPosts } from "../../actions/post";
import PostForm from "./PostForm";
import PostItem from "./PostItem";

const Posts = ({ getPosts, post: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div>
      <Row style={{ marginTop: "2%" }}>
        <Col md={{ offset: 1, size: 6 }} sm="12">
          <h1 className="large" style={{ color: "#f77f00" }}>
            Posts
          </h1>
          <p className="lead">Welcome to the community</p>
        </Col>
      </Row>
      <Row>
        <PostForm />
      </Row>
      <Row>
        <div className="posts">
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      </Row>
    </div>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
