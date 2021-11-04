import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Header from "./Components/Layout/Header";
import Landing from "./Pages/Landing";
import PageNotFound from "./Pages/PageNotFound";
import SignIn from "./Pages/auth/SignIn";
import SignUp from "./Pages/auth/SignUp";
import Alert from "./Components/Layout/Alert";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Dashboard from "./Components/Dashboard/Dashboard";
import PrivateRoute from "./Components/routing/PrivateRoute";
import CreateProfile from "./Components/profile-form/CreateProfile";
import EditProfile from "./Components/profile-form/EditProfile";
import AddEducation from "./Components/profile-form/AddEducation";
import AddExperience from "./Components/profile-form/AddExperience";
import Profiles from "./Components/profiles/Profiles";
import Profile from "./Components/profile/Profile";
import Posts from "./Components/posts/Posts";
import Post from "./Components/post/Post";

if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <ToastContainer />
        <Header />
        <Alert />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/profiles" component={Profiles} />
          <Route exact path="/profile/:id" component={Profile} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute
            exact
            path="/create-profile"
            component={CreateProfile}
          />
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          <PrivateRoute exact path="/add-education" component={AddEducation} />
          <PrivateRoute
            exact
            path="/add-experience"
            component={AddExperience}
          />
          <PrivateRoute exact path="/posts" component={Posts} />
          <PrivateRoute exact path="/post/:id" component={Post} />
          <Route exact path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
