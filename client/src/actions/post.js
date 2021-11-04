import axios from "axios";
import {
  ADD_POST,
  DELETE_POST,
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "../actions/types";
import { toast } from "react-toastify";

//GET POSTS
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/posts");

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.data },
    });
  }
};

//LIKE A POST
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/posts/like/${postId}`
    );

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.data },
    });
  }
};

//REMOVE A LIKE
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/posts/unlike/${postId}`
    );

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.data },
    });
  }
};

//DELETE A POST
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });

    toast.success("Post Deleted", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.data },
    });
  }
};

//CREATE A POST
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      "http://localhost:5000/api/posts",
      formData,
      config
    );

    dispatch({
      type: ADD_POST,
      pasyload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.data },
    });
  }
};

//GET POST
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.data },
    });
  }
};

//ADD A COMMENT
export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `http://localhost:5000/api/posts/comment/${postId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      pasyload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.data },
    });
  }
};

//REMOVE A COMMENT
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.post(
      `http://localhost:5000/api/posts/comment/${postId}/${commentId}`
    );

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.data },
    });
  }
};
