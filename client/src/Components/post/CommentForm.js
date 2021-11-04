import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, FormGroup, Input, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { addComment } from "../../actions/post";

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState("");

  return (
    <div
      className="post-form"
      style={{ width: "50%", marginLeft: "20%", marginBottom: "2%" }}
    >
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          addComment(postId, { text });
          setText("");
        }}
      >
        <FormGroup style={{ backgroundColor: "sandybrown", marginTop: "5%" }}>
          <h2>Leave A Comment</h2>
        </FormGroup>
        <FormGroup>
          <Input
            id="post"
            name="text"
            type="textarea"
            placeholder="Your comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </FormGroup>
        <Button color="primary">Post</Button>
      </Form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
