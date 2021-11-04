import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import { Form, FormGroup, Input, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");

  return (
    <div
      className="post-form"
      style={{
        width: "50%",
        marginLeft: "20%",
        marginBottom: "2%",
        marginTop: "2%",
      }}
    >
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ text });
          setText("");
        }}
      >
        <FormGroup>
          <Input
            id="post"
            name="text"
            type="textarea"
            placeholder="Say something.."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button style={{ backgroundColor: "#7b68ee" }}>Post</Button>
        </FormGroup>
      </Form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
