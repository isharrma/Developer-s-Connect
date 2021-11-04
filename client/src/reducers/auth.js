import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  DELETE_ACCOUNT,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"), // we store the token of user in local storage
  isAuthenticated: null, // would be set true or false according to user
  loading: true, // checks if there is any loading of data happening
  user: null, // all the user info like usename,avatar and etc
};

export default function auth(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload);
      return {
        ...state,
        token: payload,
        isAuthenticated: true,
        loading: false,
      };
    case SIGNUP_FAIL:
    case AUTH_ERROR:
    case DELETE_ACCOUNT:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
