import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import post from "./post";
//This file holds all the different types of reducers that we need in our app
// Reducers : are the functions that are used to change the state of a UI component on an
// application level

export default combineReducers({
  alert,
  auth,
  profile,
  post,
});
